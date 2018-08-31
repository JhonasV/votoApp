module.exports = (app) => {
    const mongoose = require('mongoose')
    const Partido = mongoose.model('Partido')
    const Voto = mongoose.model('Voto')
    app.get('/api/partido', async (req, res) => {

        let partidos = await Partido.find();
        //let estadisticas = []

        let votos = await Voto.find();
        let votosTotales = votos.length;
        //console.log(votosTotales);
        //let candidatosId;
       
        /*let estadisticas = []
        for (let i = 0; i < partidos.length; i++) {
            const partido = partidos[i];
            let cont = 0;
            for (let p = 0; p < votos.length; p++) {
                const infoVoto = votos[p];
                */
                //console.log(typeof(infoVoto._partidoId), typeof(partido._id.toString()));
                /*if(infoVoto._partidoId === partido._id.toString()){                                                                             
                    cont = cont+1;
                }
                
            }
            console.log(`El partido ${partido.nombre_partido} tiene ${cont} votos`);
            estadisticas.push({
                partidoId:partido._id.toString(),
                total_votos:cont,
                porcentaje:Math.round((cont/votos.length * 100)),
                total:votos.length
            });
        }

        console.log(estadisticas);*/
        res.json(partidos);
    })

    app.post('/api/partido', async (req, res) => {
        console.log(req.body);
        res.json(req.body)
        /*
         let partidoObject = {
             nombre_partido: req.body.nombre_partido,
             nombre_candidato: req.body.nombre_candidato,
             avatar_candidato:req.body.avatar_candidato
         }
         let estVacio = false;
         for(let partido in partidoObject){
             if(partido == ''){
                 estVacio = true
             }
         }

         if(estVacio){
             res.json({error:'todos los campos son obligatorios'})
         }else{
             new Partido(partidoObject).save()
             res.json({ok:true});
         }
         */

    })
}
