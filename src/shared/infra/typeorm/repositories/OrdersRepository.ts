import Order from '../entities/Order';
import Customer from '../entities/Custumer';
import { AppDataSource } from './../index';



interface IProduct {
    product_id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Customer;
    products: IProduct[];
}

export const ordersRepository = AppDataSource.getRepository(Order).extend({

    async findById(id: string): Promise<Order | null> {
        const order = this.findOne(
            {
                where: {
                    id
                },
                relations: ['order_products', 'customer']
            }

        );

        return order;
    },

    async createOrder({ customer, products }: IRequest): Promise<any> {
        const order = this.create({
            customer: customer,
            order_products: products,
        });

        await this.save(order);

        return order;
    }
})