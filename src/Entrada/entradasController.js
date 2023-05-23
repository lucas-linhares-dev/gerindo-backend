const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())

const Usuario = require('../../models/Usuario')

const Entrada = require('../../models/Entrada')


// router.get('/produtos', async (req, res) => {
//     const produtos = await Produto.find()

//     res.json(produtos)
// });

// router.get('/produtos/:id', async (req,res) => {
//   const id = req.params.id
//   const produto = await Produto.findOne({_id : id})

//   res.json(produto)
// })

router.post('/entradas', async (req, res) => {
  const { codigo, data, fornecedor, vlr_total, descricao, produtos  } = req.body.data
  console.log(produtos)

  try {
    const novaEntrada = new Entrada({
        codigo,
        data,
        fornecedor,
        vlr_total,
        descricao,
        produtos
    })
    await novaEntrada.save()
    
    res.status(200).json({message: 'Entrada cadastrada'})
  } catch (error) {

    res.status(500).json({error: error})
  }
})

// router.post('/update_produto', async (req, res) => {     // TRATAR ERROS -> TRY CATCH P/ CADA CHAMADA
//   const { _id, nome, descricao, preco_venda, preco_custo, codigo, estoque, categoria, fornecedor } = req.body.data


//   const produto = await Produto.findOne({_id: _id}) // COMPARAR POR ID -> PROBLEMA

//   produto.nome = nome
//     produto.descricao = descricao
//     produto.preco_venda = preco_venda
//     produto.preco_custo = preco_custo
//     produto.codigo = codigo
//     produto.estoque = estoque
  
//     console.log(categoria)

//   if(typeof categoria === 'object'){
//     produto.categoria = categoria._id
//   } 
//   else{
//     produto.categoria = categoria
//   } 

//   if(typeof fornecedor === 'object'){
//     produto.fornecedor = fornecedor._id
//   } 
//   else{
//     produto.fornecedor = fornecedor
//   } 


//   await Produto.updateOne({_id: _id}, produto)

//   return res.status(200).json(produto)
// })


// router.delete('/excluir_produto', async (req, res) => {     // TRATAR ERROS -> TRY CATCH P/ CADA CHAMADA
//   const id = req.body.id

//   // const fornecedor = await Fornecedor.findOne({_id: id})
//   await Produto.deleteOne({_id: id})
//   res.status(200).json({msg: "DEUBOM"})
// })


//   // FILTRO PELO NOME -> PARA TABELA

// router.get('/produtos_filter_name', async (req, res) => {

//     const {nome} = req.query;
//     const produtos = await Produto.find()

//     const produtosFiltrados = produtos.filter((produto) => produto.nome.toLowerCase().includes(nome.toLowerCase()))

//     const objResponse = {
//       produtos: produtosFiltrados,
//       length: produtosFiltrados.length
//     }
      
//     if(produtosFiltrados.length === 0){
//     res.json(objResponse)
//     } else {
//     res.status(200).json(objResponse)
//     }
// })

// router.get('/produtos', async (req, res) => {
//   const fornecedores = await Fornecedor.find()
//   res.json(fornecedores)
// })


module.exports = router




