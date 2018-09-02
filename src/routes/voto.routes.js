module.exports = (app) => {
    const mongoose = require('mongoose')
    const Voto = mongoose.model('Voto')
    const Votante = mongoose.model('Votante')
    const Partido = mongoose.model('Partido')

    app.get('/api/voto', async (req, res) => {
        try {
            //Creamos una instancia de Voto
            let voto = new Voto();
            //Buscamos todos los votos
            let votos = await voto.find();
            //Los retornamos al cliente
            res.json(votos);
        } catch (err) {
            //Retornamos un json con el error 500 "Error del servidor"
            console.log(err);
            res.json({
                voto: false,
                message: err
            }).status(500);
        }
        
    })

    app.post('/api/voto/seleccion', async(req, res) => {
        try {
            //Buscamos el votante con el DNI ingresado
            let votanteInfo = await Votante.findOne({
                dni: req.body.dni
            })
            //Creamos un objeto con el ID del partido y el ID de votante
            let voto = {
                _partidoId: req.body.candidatoId,
                _votanteId: votanteInfo._id
            }
            //Guardmos el objeto Voto en la coleccion de Voto para procesarlo
            let confirmaacionVoto = await new Voto(voto).save();
            //Comprobamos si el voto se procesó correctamente
            if (confirmaacionVoto) {
               //Si el objeto retorna "true" es porque se agregó correctamente
                res.json({
                    voto: true
                })
            } else {
                //Si el objeto retorna "false" es porque no se agregó correctamente
                res.json({
                    voto: false
                })
            }
        } catch (err) {
            //Retornamos un json con el error 500 "Error del servidor"
            console.log(err);
            res.json({
                voto: false,
                message: err
            }).status(500);
        }

    })

    app.post('/api/voto', async (req, res) => {
        //Obtenemos los datos del votando envias desde el navegador y creamos un objeto
        let votoDatos = {
            nombre: req.body.nombre,
            dni: req.body.dni,
            fnaciminiento: req.body.fnaciminiento,
            sexo: req.body.sexo
        }
        try {
            //Buscamos en la colección de votantes si ese DNI ya existe
            let existeVotante = await Votante.findOne({
                dni: votoDatos.dni
            })
            if (existeVotante) {
                //Si existe ese usuario ya ha votado y se lo informamos 
                res.json({
                    voto: true,
                    message: 'Ya ha votado'
                })
            } else {
                //De lo contario se agrega el voto y le permitimos al usuario continuar
                //con el proceso de votación
                new Votante(votoDatos).save()
                    .then(newVotante => {
                       
                        res.json({
                            voto: false,
                            message: 'Continue al voto',
                            dni: newVotante.dni
                        })
                    })
            }
        } catch (err) {
            //Retornamos un json con el error 500 "Error del servidor"
            console.log(err);
            res.json({
                voto: false,
                message: err
            }).status(500);
        }

    })

    app.get('/api/voto/estadisticas', async (req, res)=>{
        try {
            //Buscamos todos los partidos
            let partidos = await Partido.find();
            //Buscamos todos los votos
            let votos = await Voto.find();
            //Creamos array vacío que se rellenará con las estadísticas
            let estadisticas = []
            //Recorremos los partidos
            for (let i = 0; i < partidos.length; i++) {
                const partido = partidos[i];
                //Contador que suma cada voto que tenga el id de un candidato
                let cont = 0;
                //Recorremos los partidos
                for (let p = 0; p < votos.length; p++) {
                    const infoVoto = votos[p];
                    //Comprobabos, si un voto tiene el id de un partido, se suma 1 al
                    //contador, por cada vez que se cumple esta condición significa un voto
                    //para dicho candidato
                    if(infoVoto._partidoId === partido._id.toString()){                                                                             
                        cont = cont+1;
                    }
                    
                }
                //Llenamos el array con las estadisticas
                estadisticas.push({               
                    partidoId:partido._id.toString(), //ID del partido
                    total_votos:cont, //Los votos de ese partido
                    porcentaje:Math.round((cont/votos.length * 100)), //Sacamos el porcentaje de votos de ese candidato
                    total:votos.length //La cantidad de votos total de todos los partidos
                });
            }
            //Retornamos el array estadísticas
            res.json(estadisticas);
        } catch (err) {
            //Retornamos un json con el error 500 "Error del servidor"
            console.log(err);
            res.json({
                voto: false,
                message: err
            }).status(500);
        }
       
    })
}
