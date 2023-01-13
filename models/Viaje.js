import Sequelize from "sequelize";
import db from "../config/db.js";

// vamos a definir todo el objeto donde van a ir las columnas que queremos en el proyecto
// el id se da por sentado que existe no hace falta ponerlo
// al exportarlo ya lo podemos usar en el controlador
export const Viaje = db.define('viajes', {
    titulo: {
        type: Sequelize.STRING
    },
    precio: {
        type: Sequelize.STRING
    },
    fecha_ida: {
        type: Sequelize.DATE
    },
    fecha_vuelta: {
        type: Sequelize.DATE
    },
    imagen: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    disponibles: {
        type: Sequelize.STRING
    },
    slug: {
        type: Sequelize.STRING
    },
});