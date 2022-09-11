
import AppError from '@shared/errors/App.errors';
import { userTokenRepository } from './../../../shared/infra/typeorm/repositories/Usertoken.repository';
import { UsersRepository } from '@shared/infra/typeorm/repositories/User.repository';
import EtherealMail from '@config/mail/Etherial.mail';
import path from 'path';

interface IRequest {
    email: any;
}

class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {


        const user = await UsersRepository.findByEmail(email);


        if (!user) {
            throw new AppError('User does not exists.');
        }

        const { token } = await userTokenRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        );

        console.log(token);
        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API Vendas] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token}`,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;