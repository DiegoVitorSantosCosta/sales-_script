import AppError from '@shared/errors/App.errors';
import User from '@shared/infra/typeorm/entities/User';
import { UsersRepository } from '@shared/infra/typeorm/repositories/User.repository';
import { hash } from 'bcryptjs';
interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {

        const emailExists = await UsersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = UsersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await UsersRepository.save(user);

        return user;
    }
}

export default CreateUserService;