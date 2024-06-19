import {Request, Response} from "express";
import Orders from "../../models/orders";
import Sequelize from "../../sequelize";
import OrderDetails from "../../models/order_detail";
import ProductSize from "../../models/productSize";

export default class OrdersController {
    static async index(req: Request, res: Response) {
        try {
            const limit = req.params.limit;
            const offset = req.query.offset;
            const idUser = req.query.idUser;
            let filter: { where?: {}, limit?: number, offset?: number } = {};
            if (idUser) filter.where = {id_user: idUser};
            if (limit) filter.limit = parseInt(limit);
            if (offset) filter.offset = parseInt(offset as string);
            const orders = await Orders.findAll(filter);
            res.status(200).json(orders)
        } catch (err: Error | any) {
            res.status(500).json({error: err.message})
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const order = req.body;
            console.log(order);
            const newOrder = await Orders.create(order, {returning: true});
            res.status(200).json(newOrder);
        } catch (err: Error | any) {
            res.status(500).json({err: err.message})
        }
    }

    static async statistics(req: Request, res: Response) {
        try {
            let orders = await Orders.findAll();
            orders = JSON.parse(JSON.stringify(orders, null, 2));
            let total = 0;
            for (let order of orders) {
                if (order.status === 4) {
                    total += order.total
                }
            }

            res.status(200).json({
                totalOrders: orders.length,
                totalIncome: total
            })
        } catch (err: Error | any) {
            res.status(500).json({err: err.message})
        }
    }

    static async findOrderAndOrderDetailsById(req: Request, res: Response) {
        try {

        } catch (err: Error | any) {
            res.status(500).json({err: err.message})
        }
    }

    static async UpdateOrderStatusById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const {status} = req.body;
            let orderDetails = await OrderDetails.findAll({
                where: {id_order: id}
            });
            orderDetails = JSON.parse(JSON.stringify(orderDetails, null, 2));
            if (status === 4) {
                for (let detail of orderDetails) {
                    let product_size = await ProductSize.findOne({
                        where: {
                            id_product: detail.id_product,
                            size: detail.size
                        }
                    })
                    if (product_size) {
                        let nowQuantity = product_size.quantity;
                        if(nowQuantity < detail.quantity) {
                            res.status(403).json({error : 'Product quantity is out of range'})
                        } else {
                            let newQuantity = nowQuantity - detail.quantity;
                            await ProductSize.update({ quantity : newQuantity}, {
                                where: { id_product_size : product_size.id_product_size}
                            })
                        }
                    }
                }
                await Orders.update({ status : status}, { where :  { id_order : id}})
                res.status(200).json({ message : 'cập nhật đơn hàng thành công'})
            } else if(status === 1) {
                await Orders.update({ status : status}, { where :  { id_order : id}})
                res.status(200).json({ message : 'cập nhật đơn hàng thành công'})
            }
            res.status(200).json('success')
        } catch (err: Error | any) {
            res.status(500).json({err: err.message})
        }
    }
}
