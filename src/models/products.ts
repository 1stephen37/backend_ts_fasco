import {Model, DataTypes, INTEGER, STRING, FLOAT} from 'sequelize';
import sequelize from '../sequelize';

class Products extends Model {
    public id_product!: number;
    public id_category!: number;
    public name!: string;
    public image!: string;
    public designer!: string;
    public review!: number;
    public quantity!: number;
    public color!: string;
    public sale!: number;
    public status!: number;
    public createdAt!: string | Date;
    public updatedAt!: string | Date;
    public images : string[] = [];
}

Products.init(
    {
        id_product: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_category: {
            type: INTEGER,
            references: {
                model: 'categories', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_category', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        name: {
            type: STRING,
            allowNull: false,
        },
        image: {
            type: STRING,
            allowNull: false,
        },
        designer: {
            type: STRING,
            allowNull: false,
        },
        review: {
            type: INTEGER,
            allowNull: false,
        },
        quantity: {
            type: INTEGER,
            allowNull: false,
        },
        color: {
            type: STRING,
            allowNull: false,
        },
        sale: {
            type: FLOAT,
            allowNull: false,
        },
        status: {
            type: INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Products',
        tableName: 'products',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    }
);

export default Products;
