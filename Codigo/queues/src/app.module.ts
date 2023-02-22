import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareBuilder } from '@nestjs/core';
import { Queue } from 'bull';
import { SendMailConsumer } from './jobs/sendMail-consumer';
import { SendMailProducerService } from './jobs/sendMail-producer-service';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { UsersControllerController } from './users-controller/users-controller.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: 6379,
        password: '',
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
  controllers: [UsersControllerController],
  providers: [SendMailProducerService, SendMailConsumer],
})
export class AppModule {
  constructor(@InjectQueue('sendMail-queue') private sendMailQueue: Queue) {}

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([new BullAdapter(this.sendMailQueue)]);

    consumer.apply(router).forRoutes('/admin/queues');
  }
}
