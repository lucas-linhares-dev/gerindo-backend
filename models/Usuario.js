const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario', {
    nome: String,
    email: String,
    senha: Number,
    cargo: String,
})


module.exports = Usuario