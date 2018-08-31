const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/elecciones", ()=>{
    console.log("conectado a mongodb")
}).catch(err => {
    console.error(err)
})