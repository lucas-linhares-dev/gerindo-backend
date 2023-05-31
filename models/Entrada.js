const mongoose = require('mongoose')

const Entrada = mongoose.model('Entrada', {
    codigo: String,
    data: String,
    fornecedor: String,
    vlr_total: String,
    descricao: String,
    produtos: [{
        cod_ref: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'Produto'
            type: String,
        },
        quantidade: {
            type: Number,
        },
        nome: {
            type: String
        }
    }],
})


module.exports = Entrada