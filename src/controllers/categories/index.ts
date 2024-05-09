import Categories from '../../models/categories';
import sequelize from "../../sequelize";
import {Request, Response} from "express";

export default class CategoriesController {
    static async index(req : Request, res : Response) {
        try {
            const users = await Categories.findAll();

            res.json(users);
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

    }
}



