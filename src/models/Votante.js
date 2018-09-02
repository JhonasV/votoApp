const mongoose = require("mongoose")
const {Schema} = mongoose

const votanteSchema = new Schema({
    nombre:{type:String, require: true},
    dni:{type:String,require:true},
    fnacimiento:{type:String, require: true},
    sexo:{type:String, require:true}
})

mongoose.model('Votante', votanteSchema);