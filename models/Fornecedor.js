const mongoose = require('mongoose')

const Fornecedor = mongoose.model('Fornecedor', {
    nome: String,
    email: String,
    telefone: String,
    cnpj: String,
    cep: String,
    endereco: String,
    bairro: String,
    numero: Number,
    complemento: String,
    municipio: String,
})


module.exports = Fornecedor