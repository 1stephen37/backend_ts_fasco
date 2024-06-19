import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../sequelize';

class Wrap extends Model {
    public id_wrap!: string;
    public price! : number;
    public createdAt!: string | Date;
    public updatedAt!: string | Date;
}

Wrap.init(
    {
        id_wrap: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        price : {
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
        modelName: 'Wrap',
        tableName: 'wrap',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    }
);

export default Wrap;
