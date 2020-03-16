import express, { Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import petRoutes from './routes/pets';
// const petRoutes = require('./routes/pets');

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/pets', petRoutes);

module.exports = app;
