import { Router } from 'express'
import Order_detailsController from "../../controllers/order_details";
import {auth, authUser} from "../../libraries/authMiddleware";

const router = Router();

router.get('/', auth, Order_detailsController.index);
router.post('/add', authUser, Order_detailsController.create);
router.get('/', Order_detailsController.index);


export default router
