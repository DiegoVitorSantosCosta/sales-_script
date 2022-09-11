import AppError from '@shared/errors/App.errors';
import { UsersRepository } from '@shared/infra/typeorm/repositories/User.repository';
import { userTokenRepository } from '@shared/infra/typeorm/repositories/Usertoken.repository';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
UsersRepository


interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {

        const userToken = await userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User Token does not exists.');
        }

        const user = await UsersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.');
        }

        user.password = await hash(password, 8);
        await UsersRepository.save(user);
    }
}

export default ResetPasswordService;