const mongoose = require("mongoose");
const keys = require("../config/keys");
//mongodb://localhost:27017/elecciones
mongoose
  .connect(
    keys.MONGO_URI,
    {
      useNewUrlParser: true
    },
    () => {
      console.log("conectado a mongodb");
    }
  )
  .catch(err => {
    console.error(err);
  });
