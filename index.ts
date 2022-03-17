import app from './src/app';
import envVars from './src/util/env-vars';
import logger from './src/util/logger';
app.listen(envVars.port, () => {
  logger.info(`Server is up at ${envVars.port}`);
});
