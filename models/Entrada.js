const mongoose = require('mongoose')

const Entrada = mongoose.model('Entrada', {
    codigo: String,
    data: Date,
    fornecedor: String,
    valor_total: String,
    descricao: String,
    produtos: [{
        cod_ref: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'Produto'
            type: String,
            required: true
        },
        quantidade: {
            type: Number,
            required: true
        }
    }],
})


module.exports = Entrada