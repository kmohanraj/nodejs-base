import AWS from 'aws-sdk';
import Endpoints from './env-vars';
import logger from './logger';
import CONSTANTS from '../config/constants';

class S3 {
  #s3Instance;
  constructor(accessKey: string, secretKey: string) {
    this.#s3Instance = new AWS.S3({
      accessKeyId: accessKey,
      secretAccessKey: secretKey
    });
  }

  async upload(fileName: string, fileBuffer: Buffer) {
    try {
      const uploadStatus = await this.#s3Instance
        .upload({
          Bucket: Endpoints.thumbnailBucket.name,
          Key: `${fileName}`,
          Body: fileBuffer
        })
        .promise();
      logger.info(`${CONSTANTS.CONFIG.MESSAGES.SUCCESS.S3_UPLOAD}`);
      return uploadStatus.Location;
    } catch (err) {
      logger.info(
        `${CONSTANTS.CONFIG.MESSAGES.ERROR.S3_UPLOAD} , { err : ${err}}`
      );
    }
  }

  async delete(fileName: string) {
    try {
      const deleteStatus = await this.#s3Instance
        .deleteObject({
          Bucket: Endpoints.thumbnailBucket.name,
          Key: fileName
        })
        .promise();
      return deleteStatus.DeleteMarker;
    } catch (err) {
      logger.info(
        `${CONSTANTS.CONFIG.MESSAGES.ERROR.S3_DELETE}, { err: ${err}}`
      );
    }
  }
}

export default new S3(
  Endpoints.thumbnailBucket.accessKey,
  Endpoints.thumbnailBucket.secretKey
);
