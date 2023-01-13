import Sequelize from "sequelize";
import db from "../config/db.js";

// vamos a definir todo el objeto donde van a ir las columnas que queremos en el proyecto
// el id se da por sentado que existe no hace falta ponerlo
// al exportarlo ya lo podemos usar en el controlador
export const Testimonial = db.define('testimoniales', {
    nombre: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    },
});