import ProductsModel from '../../models/products';
import {Request, Response} from "express";

export default class ProductsController {
    static async index(req : Request, res : Response) {
        try {
            const users = await ProductsModel.findAll();
            res.json(users);
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

    }
}



