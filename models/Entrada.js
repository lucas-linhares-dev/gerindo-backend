const mongoose = require('mongoose')

const Entrada = mongoose.model('Entrada', {
    codigo: String,
    data: Date,
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
        }
    }],
})


module.exports = Entrada