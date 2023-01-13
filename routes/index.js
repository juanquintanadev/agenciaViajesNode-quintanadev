// al no ser el default el import y export, tenemos que habilitarlo en el package.json donde nos habilita este tipo de herramientas
import express from 'express';

import {guardarTestimonial} from '../controllers/testimonialController.js';

// vamos a importar todos los controladores
import { 
    paginaInicio, 
    paginaNosotros, 
    paginaViajes, 
    paginaTestimoniales, 
    paginaDetalleViaje 
} from '../controllers/paginasController.js';

// utilizamos la misma instancia de express y estamos utilizando su router
const router = express.Router();

// express soporta todos los verbos get put patch etc, donde enviamos una peticion hacia una url
// aca cuando visitamos la pagina pricipal llama a una funcion callback
// GET = cuando visitamos esa pagina.
// expres utiliza el request y el response, donde req es lo que enviamos y res es lo que expres nos envia
router.get('/', paginaInicio); // al visitar la pagina de inicio, esta llama al controlador donde esta esa funcion, en el controlador llama a la vista y este controlador muestra la vista

router.get('/nosotros', paginaNosotros);

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial); // al presionar el boton enviar pasamos al metodo post, entonces ahi vamos a llamar la funcion guardarTestimonial

router.get('/viajes', paginaViajes);

router.get('/viajes/:slug', paginaDetalleViaje)

export default router;
