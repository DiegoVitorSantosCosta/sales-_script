
import { categoriesRepositories } from '@shared/infra/typeorm/repositories/Category.repository';
import AppError from '@shared/errors/App.errors';


export default class DeleteCategoryService {

    public async execute(id: string): Promise<boolean> {
        let category = await categoriesRepositories.findOne({
            where: {
                id
            }
        });
        if (!category) {
            throw new AppError('Do not exists this category..')
        }

        let deleting = await categoriesRepositories.delete(id)
        return deleting ? true : false;
    }
}