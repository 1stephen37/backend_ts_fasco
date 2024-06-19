import ProductsModel from '../../models/products';
import {Request, Response} from "express";
import Gallery from "../../models/gallery";
import Products from "../../models/products";
import Sizes from "../../models/sizes";
import ProductSize from "../../models/productSize";
import Categories from "../../models/categories";

export default class ProductsController {
    static async index(req: Request, res: Response) {
        try {
            let idCategory = req.query.idCategory;
            let offset = req.query.offset;
            let limit = req.query.limit;
            let sortBy = req.query.sortBy;
            let sort = req.query.sort;
            let filter: { where?: {}, offset?: number, limit?: number, order?: any[] } = {};
            if (idCategory) filter.where = {id_category: idCategory};
            if (offset) filter.offset = parseInt(offset as string);
            if (limit) filter.limit = parseInt(limit as string);
            const products = await ProductsModel.findAll(filter);
            let productsList: Products[] = JSON.parse(JSON.stringify(products, null, 2));
            for (const key in productsList) {
                productsList[key].images = [];
                productsList[key].properties = [];
                let mainImage = await Gallery.findOne({
                    where: {id_product: productsList[key].id_product, is_primary : 1}
                });
                if (mainImage) {
                    mainImage = JSON.parse(JSON.stringify(mainImage, null, 2))
                    productsList[key].image = mainImage?.url || '';
                }
                let galleryImage = await Gallery.findAll({
                    where: {id_product: productsList[key].id_product, is_primary : 0}
                })
                if(galleryImage) {
                    galleryImage = JSON.parse(JSON.stringify(galleryImage, null, 2));
                    if(galleryImage.length >= 1) {
                        for(let i = 0; i < galleryImage.length; i++) {
                            productsList[key].images.push(galleryImage[i].url);
                        }
                    }
                }
                const sizes = await ProductSize.findAll({
                    where: {id_product: productsList[key].id_product},
                });
                if (sizes) {
                    const list = JSON.parse(JSON.stringify(sizes, null, 2));
                    if (list.length > 0) {
                        for (const keyList in list) {
                            console.log(list[keyList]);
                            const sizeString = await Sizes.findOne({
                                where: {id_size: list[keyList].id_size},
                            });
                            productsList[key].properties.push({
                                size: sizeString?.dataValues.size || "No size",
                                price: list[keyList].price,
                                quantity: list[keyList].quantity
                            })
                        }
                    }
                }
                let category = await Categories.findOne({
                    where : {
                        id_category : productsList[key].id_category
                    }
                })
                if(category) productsList[key].category_name = category.name
            }
            if (sortBy === 'price' && sort) {
                productsList.sort((a, b) => {
                    if (sort === 'asc') {
                        return a.properties[0].price - b.properties[0].price;
                    } else {
                        return b.properties[0].price - a.properties[0].price;
                    }
                });
            }
            if(offset && limit && idCategory) {
                let fullProductOfCategory = await ProductsModel.findAll({
                    where: { id_category: idCategory }
                })
                fullProductOfCategory = JSON.parse(JSON.stringify(fullProductOfCategory, null, 2));
                let page = Math.floor(parseInt(offset as string) / parseInt(limit as string)) + 1;
                res.status(200).json({
                    paging: {
                        page: page,
                        fullProductOfCategory : fullProductOfCategory.length
                    },
                    data: productsList
                });
            } else {
                res.status(200).json(productsList);
            }
        } catch (error) {
            res.status(500).json({error});
        }
    };

    static async findById(req: Request, res : Response) {
        try {
            let id = req.params.id;
            let product = await ProductsModel.findByPk(id);
            product = JSON.parse(JSON.stringify(product, null, 2));
            if(product) {
                product.images = [];
                product.properties = [];
                let mainImage = await Gallery.findOne({
                    where: {id_product: product.id_product, is_primary : 1}
                });
                if (mainImage) {
                    mainImage = JSON.parse(JSON.stringify(mainImage, null, 2))
                    product.image = mainImage?.url || '';
                }
                let galleryImage = await Gallery.findAll({
                    where: {id_product: product.id_product, is_primary : 0}
                })
                if(galleryImage) {
                    galleryImage = JSON.parse(JSON.stringify(galleryImage, null, 2));
                    if(galleryImage.length >= 1) {
                        for(let i = 0; i < galleryImage.length; i++) {
                            product.images.push(galleryImage[i].url);
                        }
                    }
                }
                const sizes = await ProductSize.findAll({
                    where: {id_product: product.id_product},
                });
                if (sizes) {
                    const list = JSON.parse(JSON.stringify(sizes, null, 2));
                    if (list.length > 0) {
                        for (const keyList in list) {
                            console.log(list[keyList]);
                            const sizeString = await Sizes.findOne({
                                where: {id_size: list[keyList].id_size},
                            });
                            product.properties.push({
                                size: sizeString?.dataValues.size || "No size",
                                price: list[keyList].price,
                                quantity: list[keyList].quantity
                            })
                        }
                    }
                }
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({error})
        }
    }

    static async create(req: Request, res: Response) {
        const data = req.body;
        try {
            console.log(data);
            res.status(200).json({
                data : "1312"
            });
        } catch (error) {
            res.status(500).json({error})
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            console.log(id);
            res.status(200).json({id})
        } catch (err) {
            res.status(500).json({err})
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            console.log(id);
            res.status(200).json({id})
        } catch (err) {
            res.status(500).json({err})
        }
    }

    static async statistics(req: Request, res: Response) {
        try {
            const status = req.query.status;
            let filter = {
                where: {
                    status: status || 1
                }
            }
            let products = await Products.findAll(filter);
            products = JSON.parse(JSON.stringify(products, null, 2));
            res.status(200).json({
                totalProducts : products.length
            })
        } catch (err : Error | any) {
            res.status(500).json({err : err.message})
        }
    }
}



