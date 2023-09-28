import generateSalt from './generateSalt';
import Endpoints from './env-vars';
import genrateHash from './genrateHash';

const generateHashedString = (data: string) => {
  const salt = generateSalt(Endpoints.saltRounds);
  return genrateHash(data, salt);
};

export default generateHashedString;
