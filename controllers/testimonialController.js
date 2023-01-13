// importamos el modelo Testimonial en el controlador
// asi mismo vamos a usar este modelo para pasarlos a la vista en el render ya que va a dar error si no lo encuentra por el codigo en el pug
import {Testimonial} from '../models/Testimonial.js'

const guardarTestimonial = async (req, res) => { // utilizamos async await para guardar datos en la bd ya que se puede tardar un poco

    // vamos a validar el formulario
    const {nombre, email, mensaje} = req.body;

    // creamos un arreglo vacio donde vamos a colocar con objetos todos los errores de los diferentes campos
    const errores = [];

    if(nombre.trim() === '') { // trim saca los espacios adelante y atras
        errores.push({mensaje: 'El nombre esta vacio'});
    };
    if(email.trim() === '') {
        errores.push({mensaje: 'El email esta vacio'});
    };
    if(mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje esta vacio'});
    };

    // console.log(errores);
    // console.log(req.body); // este req es lo que el usuario va a colocar en el formulario tipo post

    // si tenemos al menos un elemento en el arreglo de errores entonces quiere decir que falta algo y vamos a pasarle a la misma vista esos errores
    if(errores.length > 0) {
        // vamos a consultar los testimoniales existentes para que no sale error
        const testimoniales = await Testimonial.findAll();

        // mostramos la vista con errores
        res.render('testimoniales', { // aca le pasamos el objeto con todas las variables que queremos, pasamos todos los datos del usuario asi no tiene que volver a completarlo en caso de que le falte algo
            pagina: 'Testimoniales',
            errores,
            nombre,
            email,
            mensaje,
            testimoniales,
        });
    } else { // aca si pasamos la validacion por lo tanto tenemos que almacenarlo en la base de datos !!!!
        
        // utilizamos tru catch por si surge cualquier error entonces lo mostramos en consola
        try {
            await Testimonial.create({
                nombre,
                email,
                mensaje,
            });

            // terminamos la accion redireccionando a la misma pagina con campos vacios
            res.redirect('/testimoniales'); // nos envia a la pagina de testimoniales, y como tenemos un get a esa pagina nos muestra la pagina
        } catch (error) {
            console.log(error);
        };
    };
};

export {
    guardarTestimonial,
};