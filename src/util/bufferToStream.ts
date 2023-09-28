import { Duplex } from 'stream';

export default (buffer: ArrayBuffer) => {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);

  return stream;
};
