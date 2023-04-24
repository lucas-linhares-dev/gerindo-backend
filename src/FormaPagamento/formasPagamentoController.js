const express = require('express')
const cors = require('cors')
const router = express.Router()

router.use(express.json())
router.use(cors())



const FormaPagamento = require('../../models/FormaPagamento')

router.get('/formasPagamento_filter_name', async (req, res) => {

  const {nome} = req.query;
  const formasPagamento = await FormaPagamento.find()

  const formasPagamentoFiltradas = formasPagamento.filter((formaPagamento) => formaPagamento.nome.toLowerCase().includes(nome.toLowerCase()))

  const objResponse = {
    formasPagamento: formasPagamentoFiltradas,
    length: formasPagamentoFiltradas.length
  }
    
  if(formasPagamentoFiltradas.length === 0){
  res.json(objResponse)
  } else {
  res.status(200).json(objResponse)
  }
})


router.post('/insert_formaPagamento', async (req, res) => {
  const {nome, descricao} = req.body.data

  const novaFormaPagamento = {
    nome: nome,
    descricao: descricao
  }
  
  try {
    await FormaPagamento.create(novaFormaPagamento)

    res.status(200).json({message: 'Forma de pagamento cadastrada'})
  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.post('/update_formaPagamento', async (req, res) => {     // TRATAR ERROS -> TRY CATCH P/ CADA CHAMADA
  const {_id ,nome, descricao} = req.body.data
  const formaPagamento = await FormaPagamento.findOne({_id: _id})

  formaPagamento.nome = nome
  formaPagamento.descricao = descricao

  await FormaPagamento.updateOne({_id: _id}, formaPagamento)

  return res.status(200).json(formaPagamento)
})


router.delete('/excluir_formaPagamento', async (req, res) => {     // TRATAR ERROS -> TRY CATCH P/ CADA CHAMADA
  const id = req.body.id

  // const fornecedor = await Fornecedor.findOne({_id: id})
  await FormaPagamento.deleteOne({_id: id})
  res.status(200).json({msg: "DEUBOM"})
})

module.exports = router