const express = require('express')
const cors = require('cors')
const router = express.Router()

router.use(express.json())
router.use(cors())

const Categoria = require('../../models/Categoria')

router.get('/categorias_filter_name', async (req, res) => {

  const {nome} = req.query;
  const categorias = await Categoria.find()

  const categoriasFiltradas = categorias.filter((categoria) => categoria.nome.toLowerCase().includes(nome.toLowerCase()))

  const objResponse = {
    categorias: categoriasFiltradas,
    length: categoriasFiltradas.length
  }
    
  if(categoriasFiltradas.length === 0){
  res.json(objResponse)
  } else {
  res.status(200).json(objResponse)
  }
})

router.get('/categorias', async (req, res) => {
  const categorias = await Categoria.find()
  res.json(categorias)
})


router.post('/categorias', async (req, res) => {
  const {nome, descricao} = req.body.data

  const novaCategoria = {
    nome: nome,
    descricao: descricao
  }
  
  try {
    await Categoria.create(novaCategoria)

    res.status(200).json({message: 'Categoria cadastrada'})
  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.post('/update_categoria', async (req, res) => {     // TRATAR ERROS -> TRY CATCH P/ CADA CHAMADA
  const {_id ,nome, descricao} = req.body.data
  const categoria = await Categoria.findOne({_id: _id})

  categoria.nome = nome
  categoria.descricao = descricao

  await Categoria.updateOne({_id: _id}, categoria)

  return res.status(200).json(categoria)
})


router.delete('/excluir_categoria', async (req, res) => {     // TRATAR ERROS -> TRY CATCH P/ CADA CHAMADA
  const id = req.body.id

  // const fornecedor = await Fornecedor.findOne({_id: id})
  await Categoria.deleteOne({_id: id})
  res.status(200).json({msg: "DEUBOM"})
})

module.exports = router