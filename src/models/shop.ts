import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../sequelize';

class Shop extends Model {
    public id_shop!: string;
    public name!: string;
    public address!: string;
    public phone!: string;
    public createdAt!: string | Date;
    public updatedAt!: string | Date;
}

Shop.init(
    {
        id_shop: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: STRING,
            allowNull: false,
        },
        phone: {
            type: STRING,
            allowNull: false,
        },
        address: {
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
        modelName: 'Shop',
        tableName: 'shop',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    }
);

export default Shop;
