import { Product } from './../../../shared/infra/typeorm/entities/Product';
import { productsRepositories } from './../../../shared/infra/typeorm/repositories/Products.repositories';
import RedisCache from './../../../shared/cache/redisCache';

export default class ListProductService {
    public async execute(): Promise<Product[]> {

        const redisCache = new RedisCache();

        let products = await redisCache.recover<Product[]>(
            'PRODUCT_LIST',
        );

        if (!products) {
            products = await productsRepositories.find();
            await redisCache.save('PRODUCT_LIST', products);
        }

        return products;
    }
}