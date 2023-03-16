import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('express_shop', 'root', 'pass', {
  dialect: 'mysql',
  host: 'localhost',
});

export default sequelize;
