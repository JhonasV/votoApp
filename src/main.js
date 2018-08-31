const express = require("express")
const app = express();
const path = require("path")
require('./models')
require('./data/database')
require('./data/inicializador')

/*Configuramos el puerto en el que escuchará el servidor*/
app.set('PORT', process.env.PORT || 3000)
/************ */

/*Middlewares */
app.use(express.json());
/** */

/*Rutas*/
require('./routes/partido.routes')(app);
require('./routes/voto.routes')(app);
/*Archivos estaticos*/
app.use(express.static(path.join(__dirname, "public")))


/*Montando el servidor */
app.listen(app.get("PORT"), ()=> console.log(`Escuchando en el puerto ${app.get("PORT")}`))