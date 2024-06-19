import {Router} from 'express';
import  VouchersController from "../../controllers/vouchers";
import {authAdmin} from "../../libraries/authMiddleware";

const router = Router();

router.get('/',  VouchersController.index)
router.get('/:id',  VouchersController.getVoucherById)
router.post('/add', authAdmin,  VouchersController.addVoucherById)
router.get('/',  VouchersController.index)
router.get('/',  VouchersController.index)

export default router;
