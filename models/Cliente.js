const mongoose = require('mongoose')

const Cliente = mongoose.model('Cliente', {
    nome: String,
    email: String,
    telefone: String,
    cpf: String
})


module.exports = Cliente