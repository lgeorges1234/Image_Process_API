import express from 'express';
import { resizer, verifyCache } from '../utilities/middlewares';

const routes = express.Router();

routes.use('/image', verifyCache, resizer, (req, res) => {
  res.sendFile(res.locals.thumbPath, {
    root: '.',
  });
});

export default routes;
