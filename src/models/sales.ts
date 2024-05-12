import {Model, DataTypes, INTEGER, DOUBLE} from 'sequelize';
import sequelize from '../sequelize';

class Sales extends Model {
    public id_sale!: number;
    public discount!: number;
    public createdAt!: string;
    public updatedAt!: string;
}

Sales.init(
    {
        id_sale: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        discount: {
            type: DOUBLE,
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
        modelName: 'Sales',
        tableName: 'sales',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    }
);

export default Sales;
