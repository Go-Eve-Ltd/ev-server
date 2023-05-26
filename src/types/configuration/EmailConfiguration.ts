import {SMTPSocketOptions} from "emailjs/smtp/connection";

export default interface EmailConfiguration {
  smtp: {
    from: string;
    host: string;
    port: number;
    secure: boolean | SMTPSocketOptions;
    requireTLS: boolean | SMTPSocketOptions;
    user: string;
    password: string;
  };
  troubleshootingMode?: boolean // DEV only - set to true to send real mails when running tests
}
