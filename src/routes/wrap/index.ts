import { Router} from "express";
import WrapController from "../../controllers/wrap";

const router = Router();

router.get('/', WrapController.index);

export default router;
