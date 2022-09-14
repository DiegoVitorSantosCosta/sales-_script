import { Request, Response } from "express";
import CreateCategoryService from '../services/Create.category.service'

export default class CategoryController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, id } = request.body;
        // console.log(name, id)

        const createCategory = new CreateCategoryService();

        const category = await createCategory.execute({ name, id });

        return response.json(category);
    }
}