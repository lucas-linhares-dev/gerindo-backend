const mongoose = require('mongoose')

const FormaPagamento = mongoose.model('formaPagamento', {
    nome: String,
    descricao: String
})


module.exports = FormaPagamento