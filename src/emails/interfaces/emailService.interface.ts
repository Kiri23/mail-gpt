// creating an interface so in the future we want to add Gmail support
export const EMAIL_SERVICE = 'EMAIL SERVICE';

export interface IEmailService {
  getEmails();
}
