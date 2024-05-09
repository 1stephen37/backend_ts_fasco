import { Sequelize } from 'sequelize';
import environment from "./constants";

const sequelize = new Sequelize(environment.DB_NAME, environment.DB_USER, environment.DB_PASSWORD, {
    host: environment.DB_HOST,
    dialect: 'mysql',
});

export default sequelize;
