const mongoose = require('mongoose')

const Produto = mongoose.model('Produto', {
    nome: String,
    descricao: String,
    valor: Number,
    estoque: Number,
    categoria: Number,
    fornecedor: Number
})


module.exports = Produto