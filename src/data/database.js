const mongoose = require("mongoose");

//mongodb://localhost:27017/elecciones
mongoose.connect("mongodb://hola:hola1234@ds139632.mlab.com:39632/voteapp", ()=>{
    console.log("conectado a mongodb")
}).catch(err => {
    console.error(err)
})