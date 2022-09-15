import { AppDataSource } from "@shared/infra/typeorm";
import { categoriesRepositories } from './../../../shared/infra/typeorm/repositories/Category.repository';
import AppError from "@shared/errors/App.errors"
import RedisCache from '@shared/cache/redisCache'
import { Category } from './../../../shared/infra/typeorm/entities/Category';

export default interface Irequest {
    name: string;
    price: number;
    quantity: number
}
export default class CreateCategoryService {
    public async execute({ name, id }: any): Promise<any> {
        const categoryExists = await categoriesRepositories.findByName(name);

        if (categoryExists) {
            throw new AppError('There is a category with this name.')
        }
        const category = categoriesRepositories.create({
            name,
            id
        })
        await categoriesRepositories.save(category);
        return category;
    }


}