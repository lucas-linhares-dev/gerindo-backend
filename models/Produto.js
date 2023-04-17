const mongoose = require('mongoose')

const Produto = mongoose.model('Produto', {
    nome: String,
    descricao: String,
    preco_venda: Number,
    preco_custo: Number,
    codigo: Number, // CODIGO DE BARRA
    estoque: Number,
    categoria: Number,
    fornecedor: Number
})


module.exports = Produto