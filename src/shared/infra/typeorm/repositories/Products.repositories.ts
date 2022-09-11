import { AppDataSource } from './../index';
import { Product } from './../entities/Product';
import { In } from 'typeorm';



export const productsRepositories = AppDataSource.getRepository(Product).extend({
    async findByName(name: string): Promise<Product | null> {
        const product = this.findOne({
            where: {
                name,
            },

        });

        return product;
    },
    async findAllByIds(products: any[]): Promise<Product[]> {
        const productIds = products.map(product => product.id);

        const existentProducts = await this.find({
            where: {
                id: In(productIds)
            },
        });

        return existentProducts;
    }
})
