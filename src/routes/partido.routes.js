module.exports = (app) => {
    const mongoose = require('mongoose')
    const Partido = mongoose.model('Partido')
    
    app.get('/api/partido', async (req, res) => {
        try {
            let partidos = await Partido.find();        
            res.json(partidos);
        } catch (err) {
            console.log(err);
            res.json({
                voto: false,
                message: err
            }).status(500);
        }
       
    })

}
