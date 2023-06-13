const mongoose = require('mongoose')

const Endereco = mongoose.model('Endereco', {
    logradouro: String,
    bairro: String,
    localidade: String,
    UF: String
})


module.exports = Endereco