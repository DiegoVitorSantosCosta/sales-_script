import AppError from '@shared/errors/App.errors';
import User from '@shared/infra/typeorm/entities/User';
import { UsersRepository } from '@shared/infra/typeorm/repositories/User.repository';

class ListUserService {
    public async execute(): Promise<User[]> {

        const users = UsersRepository.find();

        return users;
    }
}

export default ListUserService;