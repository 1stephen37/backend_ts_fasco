import { Router } from 'express';
import ReviewsController from "../../controllers/reviews";

const router = Router();

router.get('/', ReviewsController.index);
router.post('/add', ReviewsController.createReview);
router.get('/:id', ReviewsController.getReviewById);

export default router;
