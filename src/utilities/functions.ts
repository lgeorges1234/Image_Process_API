import { Request, Response } from 'express';
import { readdir } from 'fs/promises';
import sharp from 'sharp';

import Extensions from './enum';
import { queryParams } from './interfaces';
import { inputImageDirectory, outputImageDirectory } from './variables';

// list the files of a directory and compare each to the request filename
export const readDirectory = async (
  dir: string,
  filename: string
): Promise<string> => {
  let name = '';
  try {
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
  } catch (err) {
    console.error(err);
  }
  // return the file if exists or ''
  return name;
};

// resize a given image
export const resize = async (reqParams: queryParams): Promise<string> => {
  let outputPath = '';
  try {
    const imagePath = `${inputImageDirectory}${reqParams.filename}.jpg`;
    outputPath = `${outputImageDirectory}${reqParams.filename}_${reqParams.width}_${reqParams.height}_thumb.jpg`;
    await sharp(imagePath)
      .resize(reqParams.width, reqParams.height, { fit: 'cover' })
      .toFile(outputPath);
  } catch (error) {
    console.log(`Error in the resize function : ${error}`);
  }
  return outputPath;
};

// eslint-disable-next-line consistent-return
export const requesteHasValidFilename = async (res: Response) => {
  try {
    // test if the image directory contains an image file having the query file name and return it
    const dirFile = await readDirectory(
      `${inputImageDirectory}`,
      `${res.locals.reqParams.filename}`
    );
    if (dirFile) {
      return dirFile;
    }
    // no valid filename in the query throw an error
    throw new Error('Filename does not exist');
    // send back to the client a 500 and "No valid input file error"
  } catch (error) {
    res.status(500).send(`${error}`);
  }
};

export const requesteHasFilename = (req: Request, res: Response): boolean => {
  // if the query contains a filename, instancies queryParams
  if (req.query.filename) {
    const reqParams: queryParams = {
      filename: req.query.filename as unknown as string,
      width: parseInt(req.query.width as unknown as string, 10) || 200,
      height: parseInt(req.query.height as unknown as string, 10) || 200,
    };
    res.locals.reqParams = reqParams;
    return true;
  }
  return false;
};
