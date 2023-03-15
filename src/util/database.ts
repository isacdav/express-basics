import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'express_shop',
});

export default pool.promise();
