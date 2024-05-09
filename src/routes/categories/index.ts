import {Router, Request, Response} from "express";
import CategoriesController from "../../controllers/categories";
const router = Router();

router.get('/', CategoriesController.index)

export default router;
