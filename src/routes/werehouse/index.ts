import { Router } from 'express';
import Order_detailsController from "../../controllers/order_details";

const router = Router();

router.get('/', Order_detailsController.index);


export default router;
