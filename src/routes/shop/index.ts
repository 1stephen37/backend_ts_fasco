import { Router } from 'express';
import ShopController from "../../controllers/shop";

const router = Router();

router.get('/', ShopController.index);

export default router;
