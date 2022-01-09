import { readdir } from 'fs/promises';
import sharp from 'sharp';

import Extensions from './enum';
import { queryParams } from './interfaces';

// list the files of a directory and compare it to filename
export const readDirectory = async (
  dir: string,
  filename: string
): Promise<string> => {
  let name = '';
  try {
    // transform the enum extension in an iterable array
    const fileExtensions = Object.values(Extensions);
    // list all files from the given path
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
    const imagePath = `public/img/full/${reqParams.filename}.jpg`;
    outputPath = `public/img/thumb/${reqParams.filename}_thumb.jpg`;
    await sharp(imagePath)
      .resize(reqParams.width, reqParams.height, { fit: 'cover' })
      .toFile(outputPath);
  } catch (error) {
    console.log(`Error in the resize function : ${error}`);
  }
  return outputPath;
};
