const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario', {
    nome: String,
    email: String,
    senha: Number,
    caixa: String // VALOR 
})


module.exports = Usuario