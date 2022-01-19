import { Request, Response, NextFunction } from 'express';
import { queryParams } from './interfaces';

import {
  resize,
  requesteHasValidFilename,
  makeOuputDir,
  positiveInt,
  isInCache,
} from './functions';

import { outputImageDirectory, inputImageDirectory } from './variables';

// Resize an image to the given parameters
export const resizer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // import the query parameters and the shouldResize boolean from locals
    const { reqParams, shouldResize } = res.locals;
    // create a thumb directory if it does not exist
    await makeOuputDir(`${outputImageDirectory}`);
    // test if the image has to be processed or is already cached
    if (!shouldResize) {
      // if the image is already cached, create an output path and pass it to the router
      const outputPath = `${outputImageDirectory}${reqParams.filename}_${reqParams.width}_${reqParams.height}_thumb.jpg`;
      res.locals.thumbPath = outputPath;
      next();
    } else {
      // else, process the image
      // test if the file exists in the public folder
      // resize and pass the resized thumb path to the router
      const outputPath = await resize(
        reqParams,
        inputImageDirectory,
        outputImageDirectory
      );
      res.locals.thumbPath = outputPath;
      next();
    }
  } catch (error) {
    next(error);
  }
};

// Tell if the image has already been processed

export const verifyCache = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // test if the query contains a filename and valid width and height
    const { reqParams } = res.locals;
    // test if the processed image is already cached
    if (isInCache(reqParams, outputImageDirectory)) {
      // if the image has already been processed, the resizer middleware is skipped
      res.locals.shouldResize = false;
      next();
      // if not cached, the cache key is set to the query parameters and the programme advance to the resizer
    } else {
      res.locals.shouldResize = true;
      next();
    }
  } catch (error) {
    next(error);
  }
};

// check if the request has valid parameters
export const requesteHasValidInput = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // enum all cases
  try {
    const hasValidFilename = await requesteHasValidFilename(
      req.query.filename as unknown as string,
      inputImageDirectory
    );
    if (
      !req.query.filename &&
      !hasValidFilename &&
      !req.query.width &&
      !req.query.height
    ) {
      throw new Error('Filename, width and height are missing');
    } else if (
      req.query.filename &&
      hasValidFilename &&
      !req.query.width &&
      !req.query.height
    ) {
      throw new Error('Width and heiht are missing');
    } else if (
      req.query.filename &&
      !hasValidFilename &&
      !req.query.width &&
      !req.query.height
    ) {
      throw new Error(
        'Width and heiht are missing and Filename does not exist'
      );
    } else if (
      req.query.filename &&
      hasValidFilename &&
      !req.query.width &&
      req.query.height
    ) {
      throw new Error('Width is missing');
    } else if (
      req.query.filename &&
      hasValidFilename &&
      req.query.width &&
      !req.query.height
    ) {
      throw new Error('Heiht is missing');
    } else if (
      !req.query.filename &&
      !hasValidFilename &&
      req.query.width &&
      req.query.height
    ) {
      throw new Error('Filename is missing');
    } else if (
      req.query.filename &&
      !hasValidFilename &&
      req.query.width &&
      req.query.height
    ) {
      throw new Error('Filename does not exist');
    } else {
      // if all parameters are set and the filename is present in the directory, instancie the query parameters
      const reqParams: queryParams = {
        filename: req.query.filename as unknown as string,
        // test if the width and height are valid parameters or set them by default
        width: positiveInt(req.query.width as unknown as string, 'width'),
        height: positiveInt(req.query.height as unknown as string, 'height'),
      };
      res.locals.reqParams = reqParams;
      next();
    }
  } catch (error) {
    next(error);
  }
};

// Handle the error message send back to the client
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!err) {
    next();
  } else {
    res.status(500).send(`${err}`);
  }
};
