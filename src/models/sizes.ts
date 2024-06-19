import {Model, INTEGER, STRING} from 'sequelize';
import sequelize from '../sequelize';

class Sizes extends Model {
    public id_sale!: number;
    public discount!: number;
    public createdAt!: string;
    public updatedAt!: string;
}

Sizes.init(
    {
        id_size: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        size: {
            type: STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Sizes',
        tableName: 'sizes',
        timestamps: false
    }
);

export default Sizes;
