import { Product } from './../../../shared/infra/typeorm/entities/Product';
import { productsRepositories } from './../../../shared/infra/typeorm/repositories/Products.repositories';
import AppError from "@shared/errors/App.errors"

interface IRequest {
    id: string;
}

export default class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product> {

        const product = await productsRepositories.findOne({
            where: {
                id
            }
        });

        if (!product) {
            throw new AppError('Product not found.');
        }

        return product;
    }
}