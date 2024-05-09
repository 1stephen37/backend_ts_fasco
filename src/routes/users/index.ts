import {Router, Request, Response} from "express";

const router = Router();

router.get('/', async (req : Request, res : Response) => {
    res.send({
        yasuo: "312312"
    })
})

export default router;
