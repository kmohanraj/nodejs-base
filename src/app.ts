import express from 'express';
import crypto from 'crypto';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import logger from './util/logger';
import CSRFHandler from './middleware/CSRF/CSRFErrorHandler';
import corsOrigin from './util/corsOrigin';
import CONSTANTS from './config/constants';
import api from './controllers/routes';

const app = express();

// prisma config------

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'dev' ? ['query', 'info'] : undefined
});
// Adding helmet to ensure the basic security level.
app.use(helmet());
app.use(cors(corsOrigin));
app.use(compression());

app.use(express.json({ limit: CONSTANTS.CONFIG.JSON_FILE_LIMIT }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(crypto.randomBytes(64).toString('hex')));
// Routes
app.use('/api/v1', api);
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    CSRFHandler(err, req, res, next);
  }
);
app.get('/healthCheck', async (req, res) => {
  try {
    await prisma.$connect();
    return res.status(200).json({ message: 'Server is Up and Healthy' });
  } catch (error) {
    logger.error('Error while healthCheck', { cause: error });
    return res
      .status(500)
      .json({ msg: 'Error while healthCheck', cause: error });
  }
});

export default app;
export { prisma as PrismaDBClient };
