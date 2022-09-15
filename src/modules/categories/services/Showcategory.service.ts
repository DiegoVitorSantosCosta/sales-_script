import { categoriesRepositories } from "@shared/infra/typeorm/repositories/Category.repository";
import AppError from '@shared/errors/App.errors';


export default class ShowCategoryService {
    public async execute({ id }: any): Promise<any> {

        let categoriesProducts = await categoriesRepositories.query(`WITH RECURSIVE cats AS ( SELECT	id, id_pai, name FROM	categories 
            WHERE id =  '${id}' UNION SELECT c.id,  c.id_pai, c.name FROM categories c INNER JOIN cats s ON s.id = c.id_pai ) 
            select c.id as cat_id, c.name as category_name,p.id as product_id, p.name, p.quantity, p.price ,p.created_at, p.updated_at
             from cats as c left JOIN products p ON p.cat_id = c.id order by created_at desc`);
        //  where p.cat_id = c.id

        if (!categoriesProducts) {
            throw new AppError(` There isn't  categories with name.`)
        }

        // const category = await categoriesRepositories.query(`select * from products as p where p.id = c0074474-c4ab-48b8-8bff-d1c0762c619e;`)
        return categoriesProducts;
        // WITH RECURSIVE cats AS(SELECT id, id_pai, name FROM categories	WHERE id = ${ id } UNION SELECT	c.id, c.id_pai, c.name FROM categories c INNER JOIN cats s ON s.id = c.id_pai) select * from cats as c left JOIN products p ON p.cat_id = c.id
        // return categoriesRepositories.query(`select * from categories c WHERE c.id = `)




    }
}