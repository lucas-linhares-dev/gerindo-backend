const mongoose = require('mongoose')

const Categoria = mongoose.model('Categoria', {
    nome: String,
    descricao: String
})


module.exports = Categoria