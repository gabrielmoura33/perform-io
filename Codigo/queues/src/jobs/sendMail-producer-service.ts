import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { CreatedUserDTO } from 'src/users-controller/user-dto';

@Injectable()
class SendMailProducerService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) {}

  async sendMail(createdUserDTO: CreatedUserDTO) {
    await this.queue.add('sendConfirmMail-job', createdUserDTO, {
      delay: 5000,
      attempts: 3,
    });
  }
}

export { SendMailProducerService };
