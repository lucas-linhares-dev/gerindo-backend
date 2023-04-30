const mongoose = require('mongoose')

const Venda = mongoose.model('Venda', {
    nome: String,
    descricao: String,
    data: Date,
    cliente: String,
    produtos: [{
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto'
        },
        quantidade: {
            type: Number,
            required: true
        }
    }],
    desconto: String
})


module.exports = Venda