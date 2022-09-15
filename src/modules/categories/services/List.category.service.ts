import { categoriesRepositories } from "@shared/infra/typeorm/repositories/Category.repository";


export default class ListCategoryService {
    public async execute(): Promise<any> {

        let categorys = await categoriesRepositories.query('select * from categories;')

        return categorys;
        // WITH RECURSIVE cats AS(SELECT id, id_pai, name FROM categories	WHERE id = ${ id } UNION SELECT	c.id, c.id_pai, c.name FROM categories c INNER JOIN cats s ON s.id = c.id_pai) select * from cats as c left JOIN products p ON p.cat_id = c.id
        // return categoriesRepositories.query(`select * from categories c WHERE c.id = `)




    }
}