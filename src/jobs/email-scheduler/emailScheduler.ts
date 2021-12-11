import { IScheduler, Scheduler } from '../scheduler';
import nodemailer, { Transporter } from "nodemailer";

export class EmailScheduler extends Scheduler {
    transporter: Transporter;

    constructor() {
        super("*/10 * * * * *");

        this.transporter = this.createTransporter();
    }

    private createTransporter() {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "<USER_NAME>",
                pass: "<USER_PASSWORD>",
            },
            logger: true
        });
    }

    private sendEmail(): Promise<IScheduler> {
        return new Promise((resolve, reject) => {
            let mailOptions = {
                from: '<FORM_EMAIL_ADDRESS>',
                to: '<TO_EMAIL_ADDRESS>',
                subject: '<EMAIL_SUBJECT>',
                text: '<EMAIL_CONTENT_TEXT_OR_HTML>'
            };
    
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    const emailStatus: IScheduler = {
                        success: false,
                        error: error
                    };
                    reject(emailStatus);
                } else {
                    const emailStatus: IScheduler = {
                        success: true,
                        error: new Error(undefined)
                    };
                    resolve(emailStatus);
                }
            });
        });
    }

    executeJob(): Promise<IScheduler> {
        return new Promise(async (resolve, reject) => {
            const sendmail = await this.sendEmail();
            resolve(sendmail);
        });
    }

}