module.exports = (app) => {
    const mongoose = require('mongoose')
    const Voto = mongoose.model('Voto')
    const Votante = mongoose.model('Votante')
    const Partido = mongoose.model('Partido')

    app.get('/api/voto', async (req, res) => {

        let voto = new Voto();
        let votos = await voto.find();

        res.json(votos);
    })

    app.post('/api/voto/seleccion', async(req, res) => {
        try {
            console.log('body', req.body);
            let votanteInfo = await Votante.findOne({
                dni: req.body.dni
            })
            console.log('info del votante',votanteInfo);
            let voto = {
                _partidoId: req.body.candidatoId,
                _votanteId: votanteInfo._id
            }
            let confirmaacionVoto = await new Voto(voto).save();
            if (confirmaacionVoto) {
                console.log('Voto agregado',confirmaacionVoto);
                res.json({
                    voto: true
                })
            } else {
                res.json({
                    voto: false
                })
            }
        } catch (err) {
            res.json({
                voto: false,
                message: err
            });
        }

    })

    app.post('/api/voto', async (req, res) => {
        let votoDatos = {
            nombre: req.body.nombre,
            dni: req.body.dni,
            fnaciminiento: req.body.fnaciminiento,
            sexo: req.body.sexo
        }
        console.log(votoDatos);
        //let candidatoId = req.body.candidatoId;
        // console.log(candidatoId)
        //res.json(candidatoId)
        //let votante = new Votante();
        try {
            let existeVotante = await Votante.findOne({
                dni: votoDatos.dni
            })
            if (existeVotante) {
                res.json({
                    voto: true,
                    message: 'Ya ha votado'
                })
            } else {

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
            console.error(err);
        }

    })

    app.get('/api/voto/estadisticas', async (req, res)=>{
        let partidos = await Partido.find();

        let votos = await Voto.find();
           
        let estadisticas = []
        for (let i = 0; i < partidos.length; i++) {
            const partido = partidos[i];
            let cont = 0;
            for (let p = 0; p < votos.length; p++) {
                const infoVoto = votos[p];
                
                if(infoVoto._partidoId === partido._id.toString()){                                                                             
                    cont = cont+1;
                }
                
            }

            estadisticas.push({               
                partidoId:partido._id.toString(),
                total_votos:cont,
                porcentaje:Math.round((cont/votos.length * 100)),
                total:votos.length
            });
        }

        res.json(estadisticas);
    })
}
