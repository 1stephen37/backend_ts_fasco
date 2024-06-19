import {Router} from "express";
import ProductsController from "../../controllers/products";
const router = Router();

router.get('/', ProductsController.index);
router.get('/statistics', ProductsController.statistics)
router.get('/:id', ProductsController.findById);
router.post('/', ProductsController.create);
router.patch('/:id', ProductsController.update);
router.delete('/:id', ProductsController.delete);

export default router;
