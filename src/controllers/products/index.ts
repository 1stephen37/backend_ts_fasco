import ProductsModel from '../../models/products';
import {Request, Response} from "express";
import Gallery from "../../models/gallery";
import Products from "../../models/products";
import Sales from "../../models/sales";

export default class ProductsController {
    static async index(req: Request, res: Response) {
        try {
            let idCategory = req.query.idCategory;
            let offset = req.query.offset;
            let limit = req.query.limit;
            console.log(idCategory);
            let filter: { where?: {} , offset? : number, limit?: number } = {};
            if (idCategory) filter.where = { id_category: idCategory };
            if (offset) filter.offset = parseInt(offset as string);
            if (limit) filter.limit = parseInt(limit as string);
            const products = await ProductsModel.findAll(filter);
            const productsList: Products[] = JSON.parse(JSON.stringify(products, null, 2));
            for (const key in productsList) {
                productsList[key].images = [];
                productsList[key].sale = 0;
                const gallery = await Gallery.findOne({
                    where: {id_product: productsList[key].id_product},
                });
                if (gallery) {
                    productsList[key].images.push(gallery.dataValues.url)
                }
                const sale = await Sales.findOne({
                    where: {id_sale: productsList[key].id_sale},
                });
                if(sale) {
                    productsList[key].sale = sale.dataValues.discount;
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



