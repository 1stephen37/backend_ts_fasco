import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../sequelize';

class Users extends Model {
    public id_user!: string;
    public name!: string;
    public password!: string;
    public email!: string;
    public address!: string;
    public phone!: string;
    public image! : string;
    public createdAt!: string | Date;
    public updatedAt!: string | Date;
    public role! : number;
}

Users.init(
    {
        id_user: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: STRING,
            allowNull: false,
        },
        password: {
            type: STRING,
            allowNull: true,
        },
        email: {
            type: STRING,
            allowNull: false,
        },
        address: {
            type: STRING,
            allowNull: false,
        },
        phone: {
            type: STRING,
            allowNull: false,
        },
        image: {
            type: STRING,
            allowNull: true,
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
        role: {
            type: INTEGER,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'Users',
        tableName: 'users',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    }
);

export default Users;
