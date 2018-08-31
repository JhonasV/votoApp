const mongoose = require("mongoose")
const {Schema} = mongoose

const votoSchema = new Schema({
    _partidoId:{type:String, required:true},
    _votanteId:{type:String, required:true}
})
/**_partidoId:{type:mongoose.Schema.Types.ObjectId, ref:'Partido', required:true},
    _votanteId:{type:mongoose.Schema.Types.ObjectId, ref:'Votante', required:true}* */


mongoose.model('Voto', votoSchema);