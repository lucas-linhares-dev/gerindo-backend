const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())

const Entrada = require('../../models/Entrada')
const Produto = require('../../models/Produto')


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

router.get('/entradas_filter', async (req, res) => {
  const { objFilters } = req.query;

  let entradasFiltradas = await Entrada.find()

  if(!objFilters){
    const objResponse = {
      entradas: entradasFiltradas,
      length: entradasFiltradas.length
    }
    return res.status(200).json(objResponse)
  }

  if (objFilters?.dt_inicial || objFilters?.dt_final) {
    console.log(objFilters)
    if (objFilters.dt_inicial && objFilters.dt_final) {
      entradasFiltradas = entradasFiltradas.filter((venda) => {
        const vendaData = new Date(venda.data);
        return (
          vendaData >= new Date(objFilters.dt_inicial) &&
          vendaData <= new Date(objFilters.dt_final)
        );
      });
    } else if (objFilters.dt_inicial) {
      entradasFiltradas = entradasFiltradas.filter((venda) => {
        const vendaData = new Date(venda.data);
        return vendaData >= new Date(objFilters.dt_inicial);
      });
    } else if (objFilters.dt_final) {
      entradasFiltradas = entradasFiltradas.filter((venda) => {
        const vendaData = new Date(venda.data);
        return vendaData <= new Date(objFilters.dt_final);
      });
    }
  }

  if (objFilters?.fornecedor) {
    entradasFiltradas = entradasFiltradas.filter((entrada) => entrada?.codigo !== '' && entrada?.fornecedor === objFilters.fornecedor)
  }


  const objResponse = {
    entradas: entradasFiltradas,
    length: entradasFiltradas.length
  }

  if (entradasFiltradas.length === 0) {
    res.json(objResponse)
  } else {
    res.status(200).json(objResponse)
  }
})


module.exports = router




