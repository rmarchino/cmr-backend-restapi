const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const usuariosSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercaase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuario', usuariosSchema);