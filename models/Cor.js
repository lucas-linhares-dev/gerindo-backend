const mongoose = require('mongoose')

const Cor = mongoose.model('Cor', {
    nome: String
})


module.exports = Cor