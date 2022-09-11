import AppError from '@shared/errors/App.errors';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/uploads';
import { UsersRepository } from '@shared/infra/typeorm/repositories/User.repository';
import User from '@shared/infra/typeorm/entities/User';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

        const user = await UsersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await UsersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;