const mongoose = require('mongoose')

const Venda = mongoose.model('Venda', {
    codigo: String,
    descricao: String,
    data: String,
    cliente: String,
    forma_pag: String,
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
    vlr_total: String
})


module.exports = Venda