import express from 'express';

import { readDirectory, resize } from './function';
import { queryParams } from './interfaces';

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
      // if the file exists, it is resized and send back to the client
      if (dirFile) {
        const output = await resize(reqParams);
        res.locals.thumbPath = output;
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
