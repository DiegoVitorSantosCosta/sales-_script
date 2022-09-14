import { AppDataSource } from './../index';
import { In } from 'typeorm';
import { Category } from './../entities/Category';



export const categoriesRepositories = AppDataSource.getRepository(Category).extend({
    async findByName(name: any): Promise<Category | any> {
        const product = this.findOne({
            where: name
        })

        return product;
    },
    // async findAllByIds(products: any[]): Promise<Category[]> {
    //     const productIds = products.map(product => product.id);

    //     const existentProducts = await this.find({
    //         where: {
    //             id: In(productIds)
    //         },
    //     });

    //     return existentProducts;
    // },

    async findById(id: any): Promise<Category | any> {
        const category = await this.find(id);

        return category;
    },


})
