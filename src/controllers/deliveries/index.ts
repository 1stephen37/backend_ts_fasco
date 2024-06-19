import {Request, Response} from 'express';
import Deliveries from "../../models/deliveries";

export default class DeliveriesController {
    static async index(req: Request, res: Response) {
        try {
            const offset = req.query.offset;
            const limit = req.query.limit;
            let filter : { offset?: number, limit?: number } = {};
            if(offset) filter.offset = parseInt(offset as string);
            if(limit) filter.limit = parseInt(limit as string);
            const deliveries = await Deliveries.findAll(filter);
             res.status(200).json(deliveries);
        } catch (err : Error | any) {
            res.status(500).json({ error: err.message });
        }
    }


}
