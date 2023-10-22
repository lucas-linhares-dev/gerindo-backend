const mongoose = require('mongoose')

const Cliente = mongoose.model('Cliente', {
    nome: String,
    email: String,
    telefone: String,
    cpf: String,
    cep: String,
    endereco: String,
    bairro: String,
    numero: String,
    complemento: String,
    municipio: String,
    estado: String,
})


module.exports = Cliente