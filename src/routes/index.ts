import express from 'express';
import resizer from '../utilities/middleware';

const routes = express.Router();

routes.get('/', resizer, (req, res) => {
  res.json(req.query);
  res.status(200);
});

export default routes;
