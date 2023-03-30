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
  const {nome} = req.body

  const novaCategoria = {
    nome: nome,
  }

  Categoria.create(novaCategoria)
  res.json({message: 'Categoria cadastrada.'})
})

module.exports = router