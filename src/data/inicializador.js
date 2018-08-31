const mongoose = require('mongoose')
const partido = mongoose.model('Partido')
 const inicializarPartidos = ()=>{
  

    new partido({
       nombre_partido:'Cambiemos',
       nombre_candidato:'Mauricio Macri',
       avatar_candidato:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Presidente_Macri_en_el_Sillon_de_Rivadavia_%28cropped%29.jpg/156px-Presidente_Macri_en_el_Sillon_de_Rivadavia_%28cropped%29.jpg'
    }
    ).save();

    new partido({
        nombre_partido:'Unidad Ciudadana',
        nombre_candidato:'Cristina Fernández de Kirchner',
        avatar_candidato:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Cristinakirchnermensaje2010.jpg/162px-Cristinakirchnermensaje2010.jpg'
     }).save()

     new partido({
        nombre_partido:'Peronismo Federal',
        nombre_candidato:'Miguel Ángel Pichetto',
        avatar_candidato:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/M._Pichetto.jpg/166px-M._Pichetto.jpg'
     }).save()
 }

 //inicializarPartidos();