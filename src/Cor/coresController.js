const express = require('express')
const cors = require('cors')
const router = express.Router()

router.use(express.json())
router.use(cors())


const Usuario = require('../../models/Usuario')

const Cor = require('../../models/Cor')


router.get('/cores', async (req, res) => {
    const cores = await Cor.find()

    res.json(cores)
});

router.get('/cores/:id', async (req,res) => {
  const id = req.params.id
  const cor = await Cor.findOne({_id : id})

  res.json(cor)
})

router.post('/cores', (req, res) => {
  const {nome} = req.body

  const novaCor = {
    nome: nome,
  }

  Cor.create(novaCor)
  res.json({message: 'Cor cadastrada.'})
})


module.exports = router