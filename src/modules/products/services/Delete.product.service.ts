import { productsRepositories } from './../../../shared/infra/typeorm/repositories/Products.repositories';
import AppError from "@shared/errors/App.errors"
interface IRequest {
    id: string;
}

export default class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {

        const product = await productsRepositories.findOne({
            where: {
                id
            }
        });

        if (!product) {
            throw new AppError('Product not found.');
        }

        await productsRepositories.remove(product);
    }
}