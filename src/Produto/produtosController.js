const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())

const Usuario = require('../../models/Usuario')

const Produto = require('../../models/Produto')


router.post('/produtos', async (req, res) => {
  const { nome, descricao, preco_venda, preco_custo, codigo, estoque, categoria, fornecedor, foto } = req.body.data

  const novoProduto = {
    nome: nome,
    descricao: descricao,
    preco_venda: preco_venda,
    preco_custo: preco_custo,
    codigo: codigo,
    estoque: estoque,
    //categoria: categoria._id || null ,
    //fornecedor: fornecedor._id || null,
    foto: foto
  }

  try {
    await Produto.create(novoProduto)
    
    res.status(200).json({message: 'Produto cadastrado'})
  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.post('/update_produto', async (req, res) => {     // 
  const { _id, nome, descricao, preco_venda, preco_custo, codigo, estoque, categoria, fornecedor, foto } = req.body.data

  console.log(req.body.data)


  const produto = await Produto.findOne({_id: _id}) // COMPARAR 

  produto.nome = nome
  produto.descricao = descricao
  produto.preco_venda = preco_venda
  produto.preco_custo = preco_custo
  produto.codigo = codigo
  produto.estoque = estoque
  produto.foto = foto
  
  if(typeof categoria === 'object'){
    produto.categoria = categoria._id
  } 
  else{
    produto.categoria = categoria
  } 

  if(typeof fornecedor === 'object'){
    produto.fornecedor = fornecedor._id
  } 
  else{
    produto.fornecedor = fornecedor
  } 

  await Produto.updateOne({_id: _id}, produto)

  return res.status(200).json(produto)
})


router.delete('/excluir_produto', async (req, res) => {     // TRATAR ERROS -> TRY CATCH P/ CADA CHAMADA
  const id = req.body.id

  // const fornecedor = await Fornecedor.findOne({_id: id})
  await Produto.deleteOne({_id: id})
  res.status(200).json({msg: "DEUBOM"})
})


  // FILTRO PELO NOME -> PARA TABELA

router.get('/produtos_filter_name', async (req, res) => {

    const {nome} = req.query;
    const produtos = await Produto.find()

    const produtosFiltrados = produtos.filter((produto) => produto.nome.toLowerCase().includes(nome.toLowerCase()))

    const objResponse = {
      produtos: produtosFiltrados,
      length: produtosFiltrados.length
    }
      
    if(produtosFiltrados.length === 0){
    res.json(objResponse)
    } else {
    res.status(200).json(objResponse)
    }
})

router.get('/produto/getWithCode/:codigo', async (req, res) => {

  const {codigo} = req.params;

  const produtos = await Produto.find()
  const produto = produtos.filter((produto) => produto.codigo.toLowerCase().includes(codigo.toLowerCase()))[0]

  res.status(200).json(produto)
  
})

router.get('/produtos', async (req, res) => {
  const fornecedores = await Fornecedor.find()
  res.json(fornecedores)
})


module.exports = router




