import { Router } from 'express';
import productsRouter from '@modules/products/routes/routes.routes';
import usersRouter from '@modules/users/routes/user.routes';
import sessionsRouter from '@modules/users/routes/session.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import ordersRouter from '@modules/orders/routes/orders.routes';
import customersRouter from '@modules/customers/routes/customers.routes';
import categoryRouter from '@modules/categories/routes/category.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/orders', ordersRouter);
routes.use('/customers', customersRouter);
routes.use('/categories', categoryRouter);


export default routes;