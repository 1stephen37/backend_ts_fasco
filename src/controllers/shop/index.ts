import {Request, Response} from 'express';
import Shop from "../../models/shop";

export default class ShopController {
    static async index(req: Request, res: Response) {
        try {
            const shop = await Shop.findOne({
                where : { id_shop : 1}
            });
            res.status(200).json(shop);
        } catch (err : Error | any) {
            res.status(500).json({ error: err.message})
        }
    }
}
