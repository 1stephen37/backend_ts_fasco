import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../sequelize';
import Sequelize from "../sequelize";

class Categories extends Model {
    public id_category!: number;
    public name!: string;
    public status!: number;
}

Categories.init(
    {
        id_category: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: STRING,
            allowNull: false,
        },
        status: {
            type: INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Categories',
        tableName: 'categories',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    }
);

export default Categories;
