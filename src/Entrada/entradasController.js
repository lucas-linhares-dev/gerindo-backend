const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())

const Usuario = require('../../models/Usuario')

const Entrada = require('../../models/Entrada')
const Produto = require('../../models/Produto')


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
        produtos: produtos
    })
    await novaEntrada.save()

    produtos.forEach(async produto => {
      const produtoBanco = await Produto.findOne({nome: produto.nome})
      let novoEstoque = produtoBanco.estoque + produto.quantidade
      await Produto.updateOne({_id: produto.cod_ref}, {$set: {estoque: novoEstoque}})
    });
    
    res.status(200).json({message: 'Entrada cadastrada'})
  } catch (error) {

    res.status(500).json({error: error})
  }
})

router.post('/update_entrada', async (req, res) => {     // TRATAR ERROS -> TRY CATCH P/ CADA CHAMADA
  const { _id, codigo, data, fornecedor, vlr_total, descricao, produtos } = req.body.data


  const entrada = await Entrada.findOne({_id: _id}) // COMPARAR POR ID -> PROBLEMA

  entrada.codigo = codigo
  entrada.data = data
  entrada.fornecedor = fornecedor
  entrada.vlr_total = vlr_total
  entrada.descricao = descricao
  entrada.produtos = produtos
  
  console.log(entrada)

  await Entrada.updateOne({_id: _id}, entrada)

  return res.status(200).json(entrada)
})


router.delete('/excluir_produto', async (req, res) => {     // TRATAR ERROS -> TRY CATCH P/ CADA CHAMADA
  const id = req.body.id

  // const fornecedor = await Fornecedor.findOne({_id: id})
  await Produto.deleteOne({_id: id})
  res.status(200).json({msg: "DEUBOM"})
})


//   // FILTRO PELO NOME -> PARA TABELA

router.get('/entradas_filter_codigo', async (req, res) => {

    const {codigo} = req.query;
    console.log(codigo)
    const entradas = await Entrada.find()


    const entradasFiltradas = entradas.filter((entrada) => entrada.codigo !== '' && entrada.codigo.toLowerCase().includes(codigo.toLowerCase()))

    const objResponse = {
      entradas: entradasFiltradas,
      length: entradasFiltradas.length
    }
      
    if(entradasFiltradas.length === 0){
    res.json(objResponse)
    } else {
    res.status(200).json(objResponse)
    }
})

router.get('/produtos', async (req, res) => {
  const fornecedores = await Fornecedor.find()
  res.json(fornecedores)
})


module.exports = router




