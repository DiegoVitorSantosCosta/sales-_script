import { compare } from 'bcryptjs';
import AppError from '@shared/errors/App.errors';
import { UsersRepository } from '@shared/infra/typeorm/repositories/User.repository';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
    email: string;
    password: string;
}

class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<any> {

        const user = await UsersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user,
            token,
        };

    }
}

export default CreateSessionsService;

