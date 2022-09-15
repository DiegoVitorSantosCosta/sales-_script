import { Category } from "@shared/infra/typeorm/entities/Category";
import { categoriesRepositories } from '@shared/infra/typeorm/repositories/Category.repository';
import AppError from '@shared/errors/App.errors';


export default class UpdateCategoryService {

    public async execute(id: string, id_pai?: string, name?: string): Promise<Category> {

        const category: any = await categoriesRepositories.findOne({
            where: {
                id
            }
        });
        if (!category) {
            throw new AppError('Do not exists category with this name.')
        }

        category.name = name;
        category.id_pai = id_pai;


        await categoriesRepositories.save(category)
        return category;
    }
}