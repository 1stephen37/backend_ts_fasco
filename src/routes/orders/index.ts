import {Router} from "express";
import OrdersController from "../../controllers/orders";
import {auth, authAdmin, authUser} from "../../libraries/authMiddleware";

const router = Router();

router.get('/', auth, OrdersController.index)
router.post('/add', authUser, OrdersController.create);
router.get('/statistics', authAdmin, OrdersController.statistics)
router.patch('/status/:id', authAdmin, OrdersController.UpdateOrderStatusById)
router.get('/:id', auth, OrdersController.findOrderAndOrderDetailsById)

export default router;
