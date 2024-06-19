import {Request, Response} from "express";
import Vouchers from "../../models/vouchers";
import {Op} from "sequelize";

export default class VouchersController {
    static async index(req: Request, res: Response) {
        try {
            const amount = req.query.amount;
            let filter: {
                where?: {
                    min_amount: any
                }
            } = {};
            if (amount) {
                filter.where = {
                        min_amount: {
                            [Op.lte]: amount
                        }
                    }
            }
            const vouchers = await Vouchers.findAll(filter);
            res.status(200).json(vouchers);
        } catch (err: Error | any) {
            res.status(500).json({error: err.message});
        }
    }

    static async getVoucherById(req: Request, res: Response) {

    }

    static async addVoucherById(req: Request, res: Response) {

    }

    static async editVoucherById(req: Request, res: Response) {

    }
}
