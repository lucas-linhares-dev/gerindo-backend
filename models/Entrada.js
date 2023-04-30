const mongoose = require('mongoose')

const Entrada = mongoose.model('Entrada', {
    codigo: String,
    nome: String,
    descricao: String,
    data: Date,
    fornecedor: String,
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
})


module.exports = Entrada