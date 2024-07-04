import schedule from 'node-schedule';
import { createTransport } from 'nodemailer';

import { EmailPayload } from '../types/email.js';

export const sendEmail = async (params: EmailPayload, customMessageId?: string) => {
  try {
    const HOST = process.env['SMTP_HOST'];
    const USERNAME = process.env['SMTP_USER'];
    const PASSWORD = process.env['SMTP_PASS'];

    const transporter = createTransport({
      host: HOST,
      port: 587,
      secure: false,
      auth: {
        user: USERNAME,
        pass: PASSWORD,
      },
    });

    // Define email options
    const mailOptions = {
      from: params.sender,
      to: params.recipient.join(', '),
      subject: params.subject,
      html: params.html,
      messageId: params.messageId,
    };

    const sendEmailNow = async () => {
      try {
        const sentEmail = await transporter.sendMail(mailOptions);
        console.log('Email sent:', sentEmail);
        return sentEmail;
      } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
      }
    };

    if (params.sendAt) {
      // Schedule email
      const sendTime = new Date(params.sendAt);
      schedule.scheduleJob(sendTime, sendEmailNow);
      console.log(`Email scheduled to be sent at ${sendTime}`);
      return { message: 'Email scheduled', sendTime };
    } else {
      // Send immediately
      return await sendEmailNow();
    }
  } catch (error) {
    console.error('Error in sendEmail function:', error);
    throw new Error('Failed to send email');
  }
};
