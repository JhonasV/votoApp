const mongoose = require("mongoose")
const {Schema} = mongoose

const partidoSchema = new Schema({
    nombre_partido:{type:String, require: true},
    nombre_candidato:{type:String,require:true},
    avatar_candidato:{type:String, require: true}
})

mongoose.model('Partido', partidoSchema);
