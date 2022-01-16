import express from 'express';
import NodeCache from 'node-cache';

import {
  resize,
  requesteHasValidInput,
  requesteHasValidFilename,
  makeOuputDir,
} from './functions';

import {
  outputImageDirectory,
  inputImageDirectory,
  defaultResizedValue,
} from './variables';

// Middleware resizer
export const resizer = async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  try {
    // import the query parameters and the shouldResize boolean from locals
    const { reqParams, shouldResize } = res.locals;
    // create a thumb directory if it does not exist
    const dirExist = await makeOuputDir(`${outputImageDirectory}`);
    console.log(`dirExist: ${dirExist}`);
    // test if the image has to be processed or is already cached
    if (!shouldResize) {
      // if the image is already cached, create an output path and pass it to the router
      console.log('Skip resizer');
      const outputPath = `${outputImageDirectory}${reqParams.filename}_${reqParams.width}_${reqParams.height}_thumb.jpg`;
      res.locals.thumbPath = outputPath;
      next();
    } else {
      // else, process the image
      const hasValidFilename = await requesteHasValidFilename(
        res,
        inputImageDirectory
      );
      // test if the file exists in the public folder
      if (hasValidFilename) {
        // resize and pass the resized thumb path to the router
        const outputPath = await resize(
          reqParams,
          inputImageDirectory,
          outputImageDirectory
        );
        res.locals.thumbPath = outputPath;
        next();
      } else {
        // no valid filename in the query throws an error
        throw new Error('Filename does not exist');
      }
    }
  } catch (error) {
    next(error);
  }
};

// Middleware verifyCache

const cache = new NodeCache();

export const verifyCache = async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  try {
    // test if the query contains a filename and valid width and height
    if (requesteHasValidInput(req, res, defaultResizedValue)) {
      const { reqParams } = res.locals;
      // test if the processed image is already cached
      if (cache.has(`${JSON.stringify(reqParams)}`)) {
        // if the image has already been processed, the resizer middleware is skipped
        res.locals.shouldResize = false;
        console.log('Retrieved value from cache !!');
        next();
        // if not cached, the cache key is set to the query parameters and the programme advance to the resizer
      } else {
        res.locals.shouldResize = true;
        console.log('No cache for that !!');
        // set a key using the query parameters and a ttl of 2hr and 47 mn
        cache.set(
          `${JSON.stringify(reqParams)}`,
          JSON.stringify(reqParams),
          10000
        );
        next();
      }
    } else {
      // no filename in the query throw an error
      throw new Error('Filename is missing');
    }
  } catch (error) {
    next(error);
  }
};
