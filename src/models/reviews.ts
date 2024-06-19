import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../sequelize';

class Reviews extends Model {
    public id_review!: string;
    public id_product!: string;
    public id_user!: string;
    public name_user!: string;
    public image_user!: string;
    public content!: string;
    public createdAt!: string | Date;
    public updatedAt!: string | Date;
}

Reviews.init(
    {
        id_review: {
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
        id_user: {
            type: INTEGER,
            references: {
                model: 'users', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_user', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        content: {
            type: STRING,
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
        }
    },
    {
        sequelize,
        modelName: 'Reviews',
        tableName: 'reviews',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    }
);

export default Reviews;
