import { Product } from './../../../shared/infra/typeorm/entities/Product';
import { productsRepositories } from './../../../shared/infra/typeorm/repositories/Products.repositories';

export default class ListProductService {
    public async execute(): Promise<Product[]> {
        const products = await productsRepositories.find()

        return products;
    }
}