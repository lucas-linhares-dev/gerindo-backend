const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())

const Usuario = require('../../models/Usuario')

const Produto = require('../../models/Produto')


router.get('/produtos', async (req, res) => {
    const produtos = await Produto.find()

    res.json(produtos)
});

router.get('/produtos/:id', async (req,res) => {
  const id = req.params.id
  const produto = await Produto.findOne({_id : id})

  res.json(produto)
})

router.post('/produtos', (req, res) => {
  const { nome, descricao, preco, estoque, categoria, fornecedor } = req.body

  const novoProduto = {
    nome: nome,
    descricao: descricao,
    preco: preco,
    estoque: estoque,
    categoria: categoria,
    fornecedor: fornecedor
  }

  Produto.create(novoProduto)
  res.json({message: 'Produto cadastrado'})
})

module.exports = router




