
// aca estamos importando express y lo estamos asignando a la variable misma
// al no ser el default el import y export, tenemos que habilitarlo en el package.json donde nos habilita este tipo de herramientas
import express from 'express';
import router from './routes/index.js'; // el ./ para que sea el directorio actual
import db from './config/db.js';

// importamos la dependencia de dotenv para trabajar con variables de entorno
import dotenv from 'dotenv';

// iniciamos la dependecia dotenv
dotenv.config();

// conectamos a la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

// y aca asignamos la funcion express a la variable app, solamente debe haber una instancia de express pura.
const app = express();

// definimos un puerto default y si no lo encuentra le asignamos 4000, process.env.PORT es una variable de entorno
const port = process.env.PORT || 4000;

// habilitar PUG, como tenemos a app como objeto principal
// utilizaremos un motor de vistas para utilizar pug
app.set('view engine', 'pug');

app.use( (req, res, next) => {
    const year = new Date(); // creamos una variable con la fecha actual

    // con esto creamos una variable en el objeto de locals, y con use la compartimos en los archivos
    res.locals.yearActual = year.getFullYear(); // forma para obtener la fecha de la variable
    res.locals.nombreSitio = 'Agencia de Viajes'; // creamos otra variable que le vamos a pasar al router
    return next();
});

// vamos a agregar body parser para leer los datos del formulario que enviamos
app.use(express.urlencoded({extended: true}));

// vamos a agregar a app el router con el metodo use, el que permite utilizar todos los verbos ya vistos para enviar y recibir informacion del servidor
app.use('/', router);

// definimos la carpeta public como los archivos estaticos de express
// de esta forma tenemos acceso a los archivos aqui contenidos y con solo colocar img/cualquierImagen.jpg en los src ya tenemos acceso
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Se le asigno el puerto ${port}`);
});