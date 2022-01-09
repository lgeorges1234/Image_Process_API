import express from 'express';
import resizer from '../utilities/middleware';

const routes = express.Router();

routes.use('/image', resizer, (req, res) => {
  res.sendFile(res.locals.thumbPath, {
    root: '.',
  });
});

export default routes;
