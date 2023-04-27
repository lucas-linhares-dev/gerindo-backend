const mongoose = require('mongoose')

const Produto = mongoose.model('Produto', {
    nome: String,
    descricao: String,
    preco_venda: String,
    preco_custo: String,
    codigo: String, // CODIGO DE BARRA
    estoque: Number,
    categoria: String,
    fornecedor: String
})


module.exports = Produto