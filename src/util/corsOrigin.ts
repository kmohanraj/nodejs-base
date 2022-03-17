import cors, { CorsOptions } from 'cors';
import express from 'express';
import envVars from './env-vars';
export default (
  req: express.Request,
  callback: (err: Error | null, options?: cors.CorsOptions) => void
) => {
  const corsOptions: CorsOptions = {
    origin: req.header('Origin') === envVars.cors.origin ? true : false
  };
  corsOptions.credentials = true;
  corsOptions.exposedHeaders = 'authorization';
  callback(null, corsOptions);
};
