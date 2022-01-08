import express from 'express';
import sharp from 'sharp';
import path from 'path';

import readDirectory from './function';
import { queryParams } from './interfaces';

// resize a given image
const resize = async (reqParams: queryParams) => {
  try {
    const imagePath = path.normalize(
      `public/img/full/${reqParams.filename}.jpg`
    );
    const outputPath = path.normalize(
      `public/img/thumb/${reqParams.filename}_thumb.jpg`
    );
    await sharp(imagePath)
      .resize(reqParams.width, reqParams.height, { fit: 'cover' })
      .toFile(outputPath);
  } catch (error) {
    console.log(`Error in the resize function : ${error}`);
  }
};

// Middleware resizer
const resizer = async (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  try {
    // test if the query contain a filename
    if (req.query.filename) {
      const reqParams: queryParams = {
        filename: req.query.filename as unknown as string,
        width: parseInt(req.query.width as unknown as string, 10) || 200,
        height: parseInt(req.query.height as unknown as string, 10) || 200,
      };
      // test if the directory public/im/full contain an image file having the file name
      const dirFile = await readDirectory(
        `public/img/full/`,
        `${reqParams.filename}`
      );
      // if the file exists, it is resized
      if (dirFile) {
        await resize(reqParams);
        next();
        // if the file does not exists an error is thrown
      } else {
        throw new Error('No valid input file');
      }
      // if there is no filename im the query, an error is thrown
    } else {
      throw new Error('No input file');
    }
  } catch (error) {
    res.status(500).send(`${error}`);
  }
};

export default resizer;

// if (req.query.filename) {
//   const reqParams: queryParams = {
//     filename: req.query.filename as unknown as string,
//     width: parseInt(req.query.width as unknown as string, 10) || 200,
//     height: parseInt(req.query.height as unknown as string, 10) || 200,
//   };
//   resize(reqParams);
//   next();
// } else {
//   res.send('No filename');
//   next(500);
// }
