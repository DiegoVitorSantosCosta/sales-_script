import { AppDataSource } from './../index';
import { In } from 'typeorm';
import { Category } from './../entities/Category';



export const categoriesRepositories = AppDataSource.getRepository(Category).extend({
    async findByName(name: any): Promise<Category | any> {
        const product = this.findOne({
            where: {
                name
            }
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
    async showCategoryProducts(id: any): Promise<Category | any> {
        const category = await this.query(`
        WITH RECURSIVE cats AS (
	SELECT
		id,
		id_pai,
		name
	FROM
		categories
	WHERE
		id  = ${id}
	UNION
		SELECT
			c.id,
			c.id_pai ,
			c.name
		FROM
			categories c
		INNER JOIN cats s ON s.id = c.id_pai
) select *  from cats as c
left JOIN products p ON p.cat_id  = c.id
;
        `)

        return category;
    },


})
