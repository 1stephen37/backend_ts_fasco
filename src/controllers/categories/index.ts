import Categories from '../../models/categories';
import {Request, Response} from "express";

export default class CategoriesController {
    static async index(req : Request, res : Response) {
        try {
            const limit = req.query.limit;
            let filter: { limit?: number } = {};
            if (limit) filter.limit = parseInt(limit as string);
            const users = await Categories.findAll(filter);
            res.json(users);
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

    }
}



