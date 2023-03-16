import { INTEGER, STRING } from 'sequelize';
import { UserInstance } from '../interfaces/interfaces';
import sequelize from '../util/database';

const User = sequelize.define<UserInstance>('user', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: STRING,
  email: {
    type: STRING,
    allowNull: false,
  },
});

export default User;
