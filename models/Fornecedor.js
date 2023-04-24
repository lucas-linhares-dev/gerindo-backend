const mongoose = require('mongoose')

const Fornecedor = mongoose.model('Fornecedor', {
    nome: String,
    email: String,
    telefone: String,
    cnpj: String
})


module.exports = Fornecedor