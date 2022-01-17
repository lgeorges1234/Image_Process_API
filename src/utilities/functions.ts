import { readdir } from 'fs/promises';
import sharp from 'sharp';
import fs, { promises as fsPromises } from 'fs';
import NodeCache from 'node-cache';

import Extensions from './enum';
import { queryParams } from './interfaces';

const cache = new NodeCache();

// list the files of a directory and compare every file to the request filename
export const readDirectory = async (
  dir: string,
  filename: string
): Promise<string> => {
  let name = '';
  // transform the enum "Extensions" in an iterable array
  const fileExtensions = Object.values(Extensions);
  // list all files from the Public Image Directory
  const files = await readdir(dir);
  for (const file of files) {
    for (const extension of fileExtensions) {
      if (file === filename + extension) {
        name = file;
      }
    }
  }
  // return the file if exists or ''
  return name;
};

// resize a given image
export const resize = async (
  reqParams: queryParams,
  fullPath: string,
  thumbPath: string
): Promise<string> => {
  try {
    let outputPath = '';
    // set the original image path
    const imagePath = `${fullPath}${reqParams.filename}.jpg`;
    // set the ouput thumb path
    outputPath = `${thumbPath}${reqParams.filename}_${reqParams.width}_${reqParams.height}_thumb.jpg`;
    // resize the original image and send the result to the ouput path
    await sharp(imagePath)
      .resize(reqParams.width, reqParams.height, { fit: 'cover' })
      .toFile(outputPath);
    return outputPath;
  } catch {
    throw new Error('Wrong parameters fot the resize function');
  }
};

// check if the filename belongs to the input folder
export const requesteHasValidFilename = async (
  filename: string,
  fullPath: string
): Promise<boolean> => {
  // test if the full image directory contains an image file having the query file name
  const dirFile = await readDirectory(`${fullPath}`, `${filename}`);
  // return true if the file existe or false
  if (dirFile !== '') {
    return true;
  }
  return false;
};

// test if the value is a positive integer
export function positiveInt(
  value: string,
  defaultResizedValue: number
): number {
  const number = parseInt(value, 10);
  // return the int value or the default value
  if (Number.isInteger(number) && number > 0) {
    return number;
  }
  return defaultResizedValue;
}

// create a thumb directory if it does not exist
export const makeOuputDir = async (thumbPath: string): Promise<boolean> => {
  const dir = fs.existsSync(thumbPath);
  if (!dir) {
    await fsPromises.mkdir(`${thumbPath}`);
    return true;
  }
  return false;
};

export const isInCache = (
  reqParams: queryParams,
  outputPath: string
): boolean => {
  // check if the image is in the cache key and exists in the directory
  const inCache = cache.has(`${JSON.stringify(reqParams)}`);
  if (
    inCache &&
    fs.existsSync(
      `${outputPath}${reqParams.filename}_${reqParams.width}_${reqParams.height}_thumb.jpg`
    )
  ) {
    return true;
  }
  // set a key using the query parameters and a ttl of 2hr and 47 mn
  cache.set(`${JSON.stringify(reqParams)}`, JSON.stringify(reqParams), 10000);
  return false;
};
