const express = require('express')
const cors = require('cors')
const router = express.Router()

router.use(express.json())
router.use(cors())


const Usuario = require('../../models/Usuario')

const Categoria = require('../../models/Categoria')


router.get('/categorias', async (req, res) => {
    const categorias = await Categoria.find()

    res.json(categorias)
});

router.get('/categorias/:id', async (req,res) => {
  const id = req.params.id
  const categoria = await Categoria.findOne({_id : id})

  res.json(categoria)
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

router.put('/categorias/:id', async (req, res) => {
    const id = req.params.id

    const categoria = await Categoria.findOne({_id: id})

    const {nome} = req.body

    categoria.nome = nome

    await Categoria.updateOne({_id: id}, categoria)

    res.status(200).json(categoria)
  })

router.delete('/categorias/:id', async (req, res) => {
    const id = req.params.id

    const categoria = await Categoria.deleteOne({_id: id})

    res.status(200).json(categoria)
})

module.exports = router