import { Request , Response } from 'express';
import Reviews from "../../models/reviews";
import Users from "../../models/users";

export default class ReviewsController {
    static async index(req : Request, res : Response) {
        try {
            const idProduct = req.query.idProduct
            let filter : { where? : {} } = {};
            if(idProduct) {
                filter.where = {
                    id_product: idProduct
                }
            }
            let reviews = await Reviews.findAll(filter);
            reviews = JSON.parse(JSON.stringify(reviews, null, 2));
            for(let review in reviews) {
                let user = await Users.findOne({
                    where: {id_user : reviews[review].id_user}
                });
                if(user) {
                    reviews[review].name_user = user.name;
                    reviews[review].image_user = user.image;
                }
            }
            res.status(200).json(reviews);
        } catch (error : Error | any) {
            res.status(500).json(error.message);
        }
    }

    static async getReviewById(req : Request, res : Response) {
        try {
            const idProduct = req.params.id;
            const reviewsList = await Reviews.findOne({
                where : { id_product : idProduct }
            })
            res.status(200).json(reviewsList);
        } catch (err : Error | any) {
            res.status(500).json({ error: err.message})
        }
    }

    static async createReview(req : Request, res : Response) {
        try {
            const review = req.body;
            let newReview = await Reviews.create(review, { returning : true});
            newReview = JSON.parse(JSON.stringify(newReview, null, 2))
            let user = await Users.findOne({
                where: {id_user : newReview.id_user}
            });
            if(user) {
                newReview.name_user = user.name;
                newReview.image_user = user.image;
            }
            res.status(200).json(newReview);
        } catch (err : Error | any) {
            res.status(500).json({ error: err.message})
        }
    }

    static async delete(req : Request, res : Response) {

    }

    static async edit(req : Request, res : Response) {

    }
}
