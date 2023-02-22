import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { CreatedUserDTO } from 'src/users-controller/user-dto';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(private mailService: MailerService) {}
  @Process('sendConfirmMail-job')
  async sendConfirmMailJob(job: Job<CreatedUserDTO>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.email,
      from: {
        name: 'Equipe Argus',
        address: 'admin@gabrielmoura.website',
      },
      subject: 'Seja bem vindo(a)',
      text: `Olá ${
        data.name
      }, seu cadastro foi realizado com scesso. Seja bem vindo(a)! ${'\n'}
      Confirme seu e-mail no seguinte link <a href=""> ${
        process.env.API_URL
      }/confirm_mail/${data.token} </a>
      `,
    });
  }

  @OnQueueCompleted()
  onCompleted(job: Job<CreatedUserDTO>) {
    const { data } = job;
    console.log(`Email de confirmação de usuário enviado para: ${data.email}`);
  }

  @OnQueueActive()
  onQueueActive(job: Job<CreatedUserDTO>) {
    const { data } = job;
    console.log(
      `Iniciando envio de Email de confirmação de usuário enviado para: ${data.email}`,
    );
  }
}

export { SendMailConsumer };
