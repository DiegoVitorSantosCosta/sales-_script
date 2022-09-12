import { productsRepositories } from './../../../shared/infra/typeorm/repositories/Products.repositories';
import AppError from "@shared/errors/App.errors"
import RedisCache from '@shared/cache/redisCache';
interface IRequest {
    id: string;
}

export default class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {

        const redisCache = new RedisCache();

        const product = await productsRepositories.findOne({
            where: {
                id
            }
        });

        if (!product) {
            throw new AppError('Product not found.');
        }
        await redisCache.invalidate('PRODUCT_LIST')


        await productsRepositories.remove(product);
    }
}