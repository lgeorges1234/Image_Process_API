import express from 'express';
import resizer from '../utilities/middleware';

const routes = express.Router();

routes.use('/', resizer, (req, res) => {
  res.send('hello api world');
});

export default routes;
