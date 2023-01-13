// importamos la dependecia sequelize
import Sequelize from 'sequelize';

// importamos la dependecia para utilizar las variables de entorno
import dotenv from 'dotenv/config';

// aca conectamos a la bd y sus opciones 
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    operatorAliases: false,
});

export default db;