import { AppDataSource } from "@shared/infra/typeorm";
import { Product } from './../../../shared/infra/typeorm/entities/Product';
import { productsRepositories } from './../../../shared/infra/typeorm/repositories/Products.repositories';
import AppError from "@shared/errors/App.errors"
import RedisCache from '@shared/cache/redisCache'

export default interface Irequest {
    name: string;
    price: number;
    quantity: number
}
export default class CreatedProductService {
    public async execute({ name, price, quantity, cat_id }: any): Promise<Product> {
        const productExists = await productsRepositories.findByName(name);
        const redisCache = new RedisCache();

        if (productExists) {
            throw new AppError("There is already one product with this name.", 404);

        }
        const product = productsRepositories.create({
            name, price, quantity, cat_id
        })
        await redisCache.invalidate('PRODUCT_LIST')
        await productsRepositories.save(product);
        return product;
    }
}