import {Request, Response} from 'express'
import Wrap from "../../models/wrap";

export default class WrapController {
    static async index(req: Request, res: Response) {
        try {
            const wrap = await Wrap.findOne({
                where: {
                    id_wrap: 1
                }
            });
            res.status(200).json(wrap);
        } catch (error: Error | any) {
            res.status(500).json({error: error.message});
        }
    }
}
