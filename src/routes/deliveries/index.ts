import { Router } from 'express';
import DeliveriesController from "../../controllers/deliveries";

const router = Router();

router.get('/', DeliveriesController.index);
router.get('/:id', DeliveriesController.index);

export default router;
