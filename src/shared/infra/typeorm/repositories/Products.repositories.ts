import { AppDataSource } from './../index';
import { Product } from './../entities/Product';



export const productsRepositories = AppDataSource.getRepository(Product).extend({
    async findByName(name: string): Promise<Product | null> {
        const product = this.findOne({
            where: {
                name,
            },
        });

        return product;
    }
})
