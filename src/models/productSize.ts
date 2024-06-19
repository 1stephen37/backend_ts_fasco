import {Model, DataTypes, INTEGER, DOUBLE} from 'sequelize';
import sequelize from '../sequelize';

class ProductSize extends Model {
    public id_product_size!: number;
    public id_product!: number;
    public price!: number;
    public quantity!: number;
}

ProductSize.init(
    {
        id_product_size: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_product: {
            type: INTEGER,
            references: {
                model: 'product', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_product', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        id_size: {
            type: INTEGER,
            references: {
                model: 'sizes', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_size', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        price: {
            type: DOUBLE,
            allowNull: false,
        },
        quantity: {
            type: INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'ProductSize',
        tableName: 'product_size',
        timestamps: false
    }
);

export default ProductSize;
