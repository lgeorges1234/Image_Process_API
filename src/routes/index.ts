import express from 'express';
import {
  resizer,
  verifyCache,
  requesteHasValidInput,
  errorHandler,
} from '../utilities/middlewares';

const routes = express.Router();

routes.use(
  '/image',
  requesteHasValidInput,
  verifyCache,
  resizer,
  errorHandler,
  (req: express.Request, res: express.Response): void => {
    res.sendFile(res.locals.thumbPath, {
      root: '.',
    });
  }
);

export default routes;
