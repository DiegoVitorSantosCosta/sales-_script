import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { UsersController } from '../controllers/User.controller';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/uploads';
import UserAvatarController from '../controllers/User.avatar.controller';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);
usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    usersController.create
);
usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.update,
);
export default usersRouter;