import sendGrid from '@sendgrid/mail';
import { IMail } from '../model/mailInterface';
import Endpoints from './env-vars';
import logger from './logger';

class Email implements IMail {
  constructor(apiKey: string) {
    sendGrid.setApiKey(apiKey);
  }
  async sendTextMail(mailBody: sendGrid.MailDataRequired) {
    try {
      return await sendGrid.send(mailBody);
    } catch (err) {
      logger.info(`Error while sending Mail, { cause: ${err} }`);
    }
  }
}

export default new Email(Endpoints.mail.apiKey);
