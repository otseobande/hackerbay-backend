import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import logger from './utils/logger';
import apiRouter from './routes/apiRouter';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();
const port = 8000;

app.use(
  morgan('combined'),
  express.urlencoded({ extended: true }),
  express.json(),
  apiRouter,
  errorHandler,
);


app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});

export default app;
