
// importamos el modelo de viaje para traer los datos
import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimonial.js";

const paginaInicio = async (req, res) => {

    // para obtener la consulta a la base de datos simultaneas tenemos que realizar los siguientes pasos
    const promiseDB = [];

    // realizamos el query de las consultas y lo vamos almacenando en el arreglo de promises
    promiseDB.push(Testimonial.findAll({limit: 3}));
    promiseDB.push(Viaje.findAll({limit: 3}));

    try {
        
        // consultamos las promises a la bd y obtenemos los resultados con el await
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home', // esta clase ya esta en la hoja de estilos creada por nosotros, donde ubicamos la imagen de fondo en la pagina principal
            viajes: resultado[1], // aca les pasamos los valores segun la posicion del arreglo donde realizamos las promises
            testimoniales: resultado[0],
        }); // aca estamos generando nuestra propia respuesta, donde send es algo utilizado para mostrar algo en pantalla, tambien puede se json donde va con {} y tipo objeto
    } catch (error) {
        console.log(error)
    }
    
};

const paginaNosotros = (req, res) => {

    // vamos a declarar una variable, la cual pasaremos a la vista y podemos utilizarla ahi
    // const viajes = 'Viaje a Alemania';

    res.render('nosotros', { // aca va a escanear por todos los archivos y va a buscar el de nosotros.pug, entre {} vamos a mandar toda la informacion que queremos hacia la vista
        pagina: 'Nosotros', // pasamos valores como un objeto el cual pasamos el nombre solo porque llave y valor es el mismo nombre, object literal enhancement
    }); 
};

const paginaViajes = async (req, res) => {
    
    // consultamos la bd para traer toda la informacion, en la documentacion de sequelize tenemos toda la informacion para realizar las consultas a la bd, en este caso vamos a usar findAll para traer todos los resultados en la bd
    const viajes = await Viaje.findAll();

    // console.log(viajes);


    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes, // pasamos el arreglo obtenido de la base de datos
    }); // aca estamos generando nuestra propia respuesta, donde send es algo utilizado para mostrar algo en pantalla, tambien puede se json donde va con {} y tipo objeto
};

// aca mostramos el viaje por el slug que seleccionamos
const paginaDetalleViaje = async (req, res) => {
    // console.log(req.params.viaje)

    // aplicamos destructuring a req.params
    const {slug} = req.params;

    // utilizamos esta herramienta en caso de que falle la consulta a la bd
    try {
        const viaje = await Viaje.findOne({where: {slug}}); // aca obtenemos la informacion del viaje donde traemos un resultado donde el slug que tenemos es igual al viaje que pasamos
        // tambien el where seria where: {slug: slug} hacemos uso de object literal enhancement y dejamos slug solo
        res.render('viaje', { // le pasamos a la vista estas variables con el contenido del viaje obtenido
            pagina: 'Informacion Viaje',
            viaje,
        });
    } catch (error) {
        console.log(error);
    };

};

const paginaTestimoniales = async (req, res) => { // al consultar bd o tener acciones sobre ella siempre el async await

    // siempre try catch al utilizar async await

    try {
        const testimoniales = await Testimonial.findAll(); // traemos todos los resultados de la tabla de testimoniales, este retorna un arreglo de objetos con la informacion

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales, // se lo pasamos a la vista principal
        }); // aca estamos generando nuestra propia respuesta, donde send es algo utilizado para mostrar algo en pantalla, tambien puede se json donde va con {} y tipo objeto
    } catch (error) {
        console.log(error)
    }

    
};

// aca vamos exportando todo las funciones que declaramos aca para ser utilizadas en el router
export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje,
}