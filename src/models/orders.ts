import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../sequelize';

class Orders extends Model {
    public id_order!: number;
    public id_user!: string;
    public delivery!: string;
    public voucher_code!: string;
    public email!: string;
    public phone!: string;
    public name!: string;
    public status!: number;
    public distance!: number;
    public ship_fee!: number;
    public total!: number;
    public createdAt!: string;
    public updatedAt!: string;
    public is_wrap!: number;
    public wrap_price!: number;
}

Orders.init(
    {
        id_order: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_delivery: {
            type: INTEGER,
            references: {
                model: 'deliveries', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_delivery', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        id_user: {
            type: INTEGER,
            references: {
                model: 'users', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_user', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        voucher_code: {
            type: STRING,
            allowNull: true,
        },
        email: {
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
        name: {
            type: STRING,
            allowNull: false,
        },
        distance: {
            type: INTEGER,
            allowNull: false,
        },
        ship_fee: {
            type: INTEGER,
            allowNull: false,
        },
        total: {
            type: INTEGER,
            allowNull: false,
        },
        status: {
            type: INTEGER,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true,
        },
        is_wrap: {
            type: INTEGER,
            allowNull: false,
        },
        wrap_price: {
            type: INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Orders',
        tableName: 'orders',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    }
);

export default Orders;
