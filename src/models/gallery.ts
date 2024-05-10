import {Model, STRING, INTEGER} from 'sequelize';
import sequelize from '../sequelize';

class Gallery extends Model {
    public id_gallery!: number;
    public id_product!: number;
    public url!: string;
}

Gallery.init(
    {
        id_gallery: {
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
        url: {
            type: STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Gallery',
        tableName: 'gallery',
        timestamps: false
    }
);

export default Gallery;
