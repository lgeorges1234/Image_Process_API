import express from 'express';
import sharp from 'sharp';
import path from 'path';

import { queryParams } from './interfaces';

const resize = async (reqParams: queryParams) => {
  const imagePath = path.normalize(`public/img/full/${reqParams.filename}.jpg`);
  const outputPath = path.normalize(
    `public/img/thumb/${reqParams.filename}_thumb.jpg`
  );
  await sharp(imagePath)
    .resize(reqParams.width, reqParams.height, { fit: 'cover' })
    .toFile(outputPath);
};

const resizer = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const reqParams: queryParams = {
    filename: req.query.filename as unknown as string,
    width: parseInt(req.query.width as unknown as string, 10) || 200,
    height: parseInt(req.query.height as unknown as string, 10) || 200,
  };
  resize(reqParams);
  next();
};

export default resizer;
