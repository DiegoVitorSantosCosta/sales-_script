import AppError from '@shared/errors/App.errors';
import Order from '@shared/infra/typeorm/entities/Order';
import { ordersRepository } from './../../../shared/infra/typeorm/repositories/OrdersRepository';


interface IRequest {
    id: string;
}

class ShowOrderService {
    public async execute({ id }: IRequest): Promise<Order> {

        const order = await ordersRepository.findById(id);

        if (!order) {
            throw new AppError('Order not found.');
        }

        return order;
    }
}

export default ShowOrderService;