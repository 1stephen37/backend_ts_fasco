import ProductsModel from '../../models/products';
import {Request, Response} from "express";
import Gallery from "../../models/gallery";
import Products from "../../models/products";

export default class ProductsController {
    static async index(req: Request, res: Response) {
        try {
            const products = await ProductsModel.findAll();
            const productsList: Products[] = JSON.parse(JSON.stringify(products, null, 2));
            console.log('All users:', productsList);
            for (const key in productsList) {
                productsList[key].images = [];
                const gallery = await Gallery.findOne({
                    where: {id_product: productsList[key].id_product},
                });
                if (gallery) {
                    productsList[key].images.push(gallery.dataValues.url)
                }
            }
            res.status(200).json(productsList);
        } catch (error) {
            res.status(500).json({error})
        }
    };

    static async create(req: Request, res: Response) {

    }

    static async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            console.log(id);
            res.status(200).json({id})
        } catch (err) {
            res.status(500).json({err})
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            console.log(id);
            res.status(200).json({id})
        } catch (err) {
            res.status(500).json({err})
        }
    }
}



