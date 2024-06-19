import {Router} from "express";
import CategoriesController from "../../controllers/categories";
const router = Router();

router.get('/', CategoriesController.index)
router.get('/:id', CategoriesController.getCategoryById)
router.post('/', CategoriesController.index)
router.get('/', CategoriesController.index)

export default router;
