const mongoose = require('mongoose')

const Textura = mongoose.model('Textura', {
    nome: String
})


module.exports = Textura