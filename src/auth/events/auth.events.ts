import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import * as sgMail from '@sendgrid/mail';
import { config } from 'dotenv';

@Injectable()
export class AuthEvents {
    constructor(private readonly configService: ConfigService) {
        sgMail.setApiKey(configService.get('MAILER_API_KEY'));
    }
    private readonly logger = new Logger(AuthEvents.name);

    @OnEvent('user.created')
    async sendEmail(userEmail: string) {
        this.logger.log('Sending email....');
        const mail = {
            to: userEmail,
            from: this.configService.get('FROM_EMAIL'),
            subject: 'Welcome to nest js ecommerce',
            text: 'Hello , you just subscribed to ecommerce nest js ',
        };
        const transporter = await sgMail
            .send(mail)
            .catch((error) => this.logger.error(error));
    }
}
