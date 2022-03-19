import express from 'express';
import path from 'path';
import cors from 'cors';
// import { PrismaClient } from '@prisma/client';
import helmet from 'helmet';
// import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from './util/logger';
import corsOrigin from './util/corsOrigin';
import CONSTANTS from './constant/constants';

const app = express();

// prisma config------

// const prisma = new PrismaClient();
// ({
//   log: process.env.NODE_ENV === 'dev' ? ['query', 'info'] : undefined
// });
// Adding helmet to ensure the basic security level.
app.use(helmet());
app.use(cors(corsOrigin));
app.use(compression());

app.use(express.json({ limit: CONSTANTS.CONFIG.JSON_FILE_LIMIT }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/healthCheck', async (req, res) => {
  try {
    // await prisma.$connnect();
    return res.status(200).json({ message: 'Server is Up and Healthy' });
  } catch (error) {
    logger.error('Error while healthCheck', { cause: error });
    return res
      .status(500)
      .json({ msg: 'Error while healthCheck', cause: error });
  }
});

export default app;
// export { prisma as PrismaClient };
