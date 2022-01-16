import { Request, Response } from 'express';
import { readdir } from 'fs/promises';
import sharp from 'sharp';
import fs, { promises as fsPromises } from 'fs';

import Extensions from './enum';
import { queryParams } from './interfaces';

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
};

// Check if the filename belongs to the input folder
export const requesteHasValidFilename = async (
  res: Response,
  fullPath: string
): Promise<boolean> => {
  // test if the full image directory contains an image file having the query file name
  const dirFile = await readDirectory(
    `${fullPath}`,
    `${res.locals.reqParams.filename}`
  );
  // return true if the file existe or false
  if (dirFile !== '') {
    return true;
  }
  return false;
};

// test if the value is a positive integer
function positiveInt(value: string, defaultResizedValue: number): number {
  const number = parseInt(value, 10);
  // return the int value or the default value
  if (Number.isInteger(number) && number > 0) {
    return number;
  }
  return defaultResizedValue;
}

// check if the request has valid parameters
export const requesteHasValidInput = (
  req: Request,
  res: Response,
  defaultResizedValue: number
): boolean => {
  // if the query contains a filename, instances reqParams
  if (req.query.filename) {
    const reqParams: queryParams = {
      filename: req.query.filename as unknown as string,
      // test if the width and height are valid parameters or set them by default
      width: positiveInt(
        req.query.width as unknown as string,
        defaultResizedValue
      ),
      height: positiveInt(
        req.query.height as unknown as string,
        defaultResizedValue
      ),
    };
    res.locals.reqParams = reqParams;
    // return true if reqParams has been instanced or false
    return true;
  }
  return false;
};

// create a thumb directory if it does not exist
export const makeOuputDir = async (thumbPath: string): Promise<boolean> => {
  const dir = fs.existsSync(thumbPath);
  if (!dir) {
    await fsPromises.mkdir(`${thumbPath}`);
    return true;
  }
  return false;
};
