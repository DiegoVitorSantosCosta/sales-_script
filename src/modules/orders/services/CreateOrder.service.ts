import AppError from '@shared/errors/App.errors';
import Order from '@shared/infra/typeorm/entities/Order';
import { customersRepository } from '@shared/infra/typeorm/repositories/Custumer.repository';
import { ordersRepository } from './../../../shared/infra/typeorm/repositories/OrdersRepository';
import { productsRepositories } from './../../../shared/infra/typeorm/repositories/Products.repositories';
import { Product } from './../../../shared/infra/typeorm/entities/Product';



interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
}

class CreateOrderService {
    public async execute({ customer_id, products }: IRequest): Promise<Order> {


        const customerExists = await customersRepository.findById(customer_id);

        if (!customerExists) {
            throw new AppError('Could not find any customer with the given id.');
        }

        const existsProducts = await productsRepositories.findAllByIds(products);

        if (!existsProducts.length) {
            throw new AppError('Could not find any products with the given ids.');
        }

        const existsProductsIds = existsProducts.map((product: Product) => product.id);

        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id),
        );

        if (checkInexistentProducts.length) {
            throw new AppError(
                `Could not find product ${checkInexistentProducts[0].id}.`,
            );
        }

        const quantityAvailable = products.filter(
            product =>
                existsProducts.filter((p: any) => p.id === product.id)[0].quantity <
                product.quantity,
        );

        if (quantityAvailable.length) {
            throw new AppError(
                `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
            );
        }

        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter((p: any) => p.id === product.id)[0].price,
        }));

        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializedProducts,
        });

        const { order_products } = order;

        const updatedProductQuantity = order_products.map((product: any) => ({
            id: product.product_id,
            quantity:
                existsProducts.filter((p: any) => p.id === product.product_id)[0].quantity -
                product.quantity,
        }));

        await productsRepositories.save(updatedProductQuantity);

        return order;
    }
}

export default CreateOrderService;
