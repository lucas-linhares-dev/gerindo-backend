const mongoose = require('mongoose')

const Cliente = mongoose.model('Cliente', {
    nome: String,
    email: String,
    telefone: String,
    cpf: String,
    cep: String,
    endereco: String,
    bairro: String,
    numero: Number,
    complemento: String,
    municipio: String,
})


module.exports = Cliente