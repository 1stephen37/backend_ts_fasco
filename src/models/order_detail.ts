import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../sequelize';

class OrderDetails extends Model {
    public id_order_detail!: number;
    public id_product!: number;
    public id_order!: number;
    public price!: number;
    public sale_off!: number;
    public quantity!: number;
    public size!: string;
    public product_name? : string;
    public product_image? : string;
}

OrderDetails.init(
    {
        id_order_detail: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_product: {
            type: INTEGER,
            references: {
                model: 'products', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_product', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        id_order: {
            type: INTEGER,
            references: {
                model: 'orders', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_order', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        price: {
            type: INTEGER,
            allowNull: false,
        },
        sale_off: {
            type: INTEGER,
            allowNull: false,
        },
        quantity : {
            type: INTEGER,
            allowNull: false,
        },
        size: {
            type: STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'OrderDetails',
        tableName: 'order_details',
        timestamps: false,
    }
);

export default OrderDetails;
