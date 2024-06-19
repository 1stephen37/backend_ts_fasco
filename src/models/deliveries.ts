import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../sequelize';

class Deliveries extends Model {
    public id_delivery!: number;
    public name!: string;
    public price!: number;
    public speed!: string;
    public status!: number;
    public createdAt!: string;
    public updatedAt!: string;
}

Deliveries.init(
    {
        id_delivery: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: STRING,
            allowNull: false,
        },
        price: {
            type: INTEGER,
            allowNull: false,
        },
        speed: {
            type: STRING,
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
        modelName: 'Deliveries',
        tableName: 'deliveries',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    }
);

export default Deliveries;
