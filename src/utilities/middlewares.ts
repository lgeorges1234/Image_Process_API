import express from 'express';
import NodeCache from 'node-cache';

import {
  resize,
  requesteHasFilename,
  requesteHasValidFilename,
} from './functions';

import { outputImageDirectory } from './variables';

// Middleware resizer
export const resizer = async (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  try {
    const { reqParams, shouldResize } = res.locals;
    if (!shouldResize) {
      console.log('Skip resizer');
      const outputPath = `${outputImageDirectory}${reqParams.filename}_${reqParams.width}_${reqParams.height}_thumb.jpg`;
      res.locals.thumbPath = outputPath;
      next();
    } else {
      // test if the file exists
      requesteHasValidFilename(res);
      // resize and pass to the resized image path to the router
      const outputPath = await resize(reqParams);
      res.locals.thumbPath = outputPath;
      next();
    }
  } catch (error) {
    res.status(500).send(`${error}`);
  }
};

// Middleware verifyCache

const cache = new NodeCache();

export const verifyCache = async (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  try {
    // test if the query contains a filename
    if (requesteHasFilename(req, res)) {
      const { reqParams } = res.locals;
      // test if the processed image is already cached
      if (cache.has(`${JSON.stringify(reqParams.reqParams)}`)) {
        console.log('Retrieved value from cache !!');
        // if the image has already been processed, the resizer middleware is skipped
        res.locals.shouldResize = false;
        next();
        // if not cached, the cache key is set to the query parameters and the programme advance to the next middleware
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
      throw new Error('Filename missing');
    }
    // send back to the client a 500 and "No input file error"
  } catch (error) {
    res.status(500).send(`${error}`);
  }
};
