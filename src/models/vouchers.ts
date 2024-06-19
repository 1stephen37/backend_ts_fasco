import {Model, DataTypes, INTEGER, STRING, DOUBLE} from 'sequelize';
import sequelize from '../sequelize';

class Vouchers extends Model {
    public id_wrap!: string;
    public price! : number;
    public createdAt!: string | Date;
    public updatedAt!: string | Date;
}

Vouchers.init(
    {
        id_voucher: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code : {
            type: STRING,
            allowNull: false,
        },
        discount : {
            type: DOUBLE,
            allowNull: false,
        },
        max_discount : {
            type: INTEGER,
            allowNull: false,
        },
        min_amount : {
            type: INTEGER,
            allowNull: false,
        },
        is_percent : {
            type: INTEGER,
            allowNull: false,
        },
        end_date : {
            type: STRING,
            allowNull: false,
        },
        expired : {
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
        }
    },
    {
        sequelize,
        modelName: 'Vouchers',
        tableName: 'vouchers',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    }
);

export default Vouchers;
