import { Product } from './../../../shared/infra/typeorm/entities/Product';
import { productsRepositories } from './../../../shared/infra/typeorm/repositories/Products.repositories';
import AppError from "@shared/errors/App.errors"

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

        await productsRepositories.save(product);

        return product;
    }
}