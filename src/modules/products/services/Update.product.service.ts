import { Product } from './../../../shared/infra/typeorm/entities/Product';
import { productsRepositories } from './../../../shared/infra/typeorm/repositories/Products.repositories';
import AppError from "@shared/errors/App.errors"
import RedisCache from '@shared/cache/redisCache';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export default class UpdateProductService {
    public async execute({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const redisCache = new RedisCache();


        const product = await productsRepositories.findOne({
            where: {
                id
            }
        });

        if (!product) {
            throw new AppError('Product not found.');
        }

        const productExists = await productsRepositories.findByName(name);

        if (productExists) {
            throw new AppError('There is already one product with this name');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await redisCache.invalidate('PRODUCT_LIST')
        await productsRepositories.save(product);

        return product;
    }
}