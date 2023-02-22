import { Body, Controller, Post } from '@nestjs/common';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';
import { CreatedUserDTO } from './user-dto';

@Controller('users-controller')
export class UsersControllerController {
  constructor(private sendMailservice: SendMailProducerService) {}

  @Post('/')
  async createUser(@Body() createdUser: CreatedUserDTO) {
    this.sendMailservice.sendMail(createdUser);

    return { status: 200, message: 'Confirmation Mail Sent!' };
  }
}
