const mongoose = require('mongoose')

const Alimento = mongoose.model('Alimento', {
    nome: String,
    categoria: Number, // TABELA DE CATEGORIAS
    cor: String,     // TABELA DE CORES??
    textura: Number // TABELA DE TEXTURAS
})


module.exports = Alimento