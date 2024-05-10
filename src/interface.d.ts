
interface Product {
    id_product: number;
    id_category: number;
    name: string;
    image: string;
    designer: string;
    review: number;
    quantity: number;
    color: string;
    sale: number;
    status: number;
    createdAt: string | Date;
    updatedAt: string | Date;
    images?: any[];
}
