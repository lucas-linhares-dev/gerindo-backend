const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())


const Produto = require('../../models/Produto');
const Venda = require('../../models/Venda');


// router.get('/produtos', async (req, res) => {
//     const produtos = await Produto.find()

//     res.json(produtos)
// });

// router.get('/produtos/:id', async (req,res) => {
//   const id = req.params.id
//   const produto = await Produto.findOne({_id : id})

//   res.json(produto)
// })

router.post('/vendas', async (req, res) => {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  const { codigo, data, cliente, forma_pag, vlr_total, descricao, produtos  } = req.body.data
  console.log(req.body.data)

  try {
    const novaVenda = new Venda({
        codigo,
        data,
        cliente: cliente._id,
        forma_pag: forma_pag._id,
        vlr_total,
        descricao,
        produtos: produtos
    })

    console.log(novaVenda)
    await novaVenda.save()

    produtos.forEach(async produto => {
      const produtoBanco = await Produto.findOne({nome: produto.nome})
      let novoEstoque = produtoBanco.estoque - produto.quantidade
      await Produto.updateOne({_id: produto.cod_ref}, {$set: {estoque: novoEstoque}})
    });
    
    res.status(200).json({message: 'Venda cadastrada'})
  } catch (error) {

    res.status(500).json({error: error})
  }
})

router.post('/update_venda', async (req, res) => {     // TRATAR ERROS -> TRY CATCH P/ CADA CHAMADA
  const { _id, codigo, data, cliente, forma_pag, vlr_total, descricao, produtos } = req.body.data


  const venda = await Venda.findOne({_id: _id}) // COMPARAR POR ID -> PROBLEMA

  venda.codigo = codigo
  venda.data = data
  venda.cliente = cliente
  venda.forma_pag = forma_pag
  venda.vlr_total = vlr_total
  venda.descricao = descricao
  venda.produtos = produtos
  
  console.log(venda)

  await Venda.updateOne({_id: _id}, venda)

  return res.status(200).json(venda)
})


//   // FILTRO PELO NOME -> PARA TABELA

router.get('/vendas_filter_codigo', async (req, res) => {

    const {codigo} = req.query;
    console.log(codigo)
    const vendas = await Venda.find()


    const vendasFiltradas = vendas.filter((venda) => venda.codigo !== '' && venda.codigo.toLowerCase().includes(codigo.toLowerCase()))

    const objResponse = {
      vendas: vendasFiltradas,
      length: vendasFiltradas.length
    }
      
    if(vendasFiltradas.length === 0){
    res.json(objResponse)
    } else {
    res.status(200).json(objResponse)
    }
})

module.exports = router
