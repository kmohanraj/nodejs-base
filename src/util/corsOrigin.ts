import cors, { CorsOptions } from 'cors';
import express from 'express';

import Endpoints from './env-vars';

export default (
  req: express.Request,
  // eslint-disable-next-line no-unused-vars
  callback: (err: Error | null, options?: cors.CorsOptions) => void
) => {
  const corsOptions: CorsOptions =
    req.header('Origin') === Endpoints.cors.origin
      ? { origin: true }
      : { origin: false };

  corsOptions.credentials = true;
  corsOptions.exposedHeaders = 'authorization';

  callback(null, corsOptions);
};
