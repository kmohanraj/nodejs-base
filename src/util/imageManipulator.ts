import sharp from 'sharp';
import logger from './logger';
import CONSTANTS from '../config/constants';

class ImageManipulator {
  async resize(inputBuffer: Buffer) {
    try {
      const { DIMENSIONS } = CONSTANTS.CONFIG.THUMBNAIL_LIMITATIONS;
      return await sharp(inputBuffer)
        .resize(DIMENSIONS.WIDTH, DIMENSIONS.HEIGHT)
        .png({ quality: 80 })
        .toBuffer();
    } catch (err) {
      logger.info(`${CONSTANTS.CONFIG.MESSAGES.ERROR.RESIZE}, { err: ${err} }`);
    }
  }
}

export default new ImageManipulator();
