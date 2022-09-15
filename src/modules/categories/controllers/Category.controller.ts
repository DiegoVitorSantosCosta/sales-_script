import { Request, Response } from "express";
import CreateCategoryService from '../services/Create.category.service'
import ListCategoryService from "../services/List.category.service";
import ShowCategoryService from './../services/Showcategory.service';
import DeleteCategoryService from './../services/Deletecategoy.service';
import UpdateCategoryService from "../services/Updatecategory.service";

export default class CategoryController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, id } = request.body;
        // console.log(name, id)

        const createCategory = new CreateCategoryService();

        const category = await createCategory.execute({ name, id });

        return response.json(category);
    }

    public async showCategoryProducts(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;
        const showCategory = new ShowCategoryService();

        const category = await showCategory.execute({ id });

        return response.json(category);

    }
    public async listCategories(req: Request, res: Response): Promise<Response> {

        const categoriesList = await new ListCategoryService();
        const list = await categoriesList.execute();

        return res.json(list)
    }

    public async deleteCategories(req: Request, res: Response): Promise<Response> {


        const { id } = req.params
        const deleteCategory = new DeleteCategoryService();
        const del = await deleteCategory.execute(id);

        return res.json(true)
    }
    public async updateCategory(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;
        const { id_pai, name } = request.body;
        const updateCategory = new UpdateCategoryService();

        const category = await updateCategory.execute(id, id_pai, name);

        return response.json(category);

    }
}