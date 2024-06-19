import { Request, Response} from "express";
import OrderDetails from "../../models/order_detail";
import Products from "../../models/products";
import Gallery from "../../models/gallery";

export default class Order_detailsController {
    static async index (req : Request, res : Response) {
        try {
            const idOrder = req.query.idOrder;
            let filter: { where?: {}} = {};
            if(idOrder) filter.where = { id_order : idOrder };
            let orderDetailsList = await OrderDetails.findAll(filter);
            orderDetailsList = JSON.parse(JSON.stringify(orderDetailsList, null, 2));
            for(let index in orderDetailsList) {
                let product = await Products.findOne({
                    where: {
                        id_product : orderDetailsList[index].id_product
                    }
                })
                if(product) {
                    orderDetailsList[index].product_name = product.name;
                    let image = await Gallery.findOne({
                        where : {
                            id_product : product.id_product,
                            is_primary: 1
                        }
                    })
                    if(image) orderDetailsList[index].product_image = image.url;
                }
            }
            res.status(200).json(orderDetailsList);
        } catch (err : Error | any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async create (req : Request, res : Response) {
        try {
            const order_detail = req.body;
            const new_order_detail = await OrderDetails.create(order_detail, { returning : true});
            res.status(200).json(new_order_detail);
        } catch (err : Error | any) {
            res.status(500).json({ error: err.message });
        }
    }
}
