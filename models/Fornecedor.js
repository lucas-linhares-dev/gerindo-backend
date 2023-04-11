const mongoose = require('mongoose')

const Fornecedor = mongoose.model('Fornecedor', {
    nome: String,
    email: String,
    telefone: Number,
    cnpj: Number
})


module.exports = Fornecedor