import CategoryController from "../controllers/Category.controller";
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';


const categoryRoutes = Router();
const categoriesController = new CategoryController();

// categoryRoutes.use(isAuthenticated);
categoryRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            id: Joi.string().optional()
        },
    }),
    categoriesController.create
);
export default categoryRoutes;