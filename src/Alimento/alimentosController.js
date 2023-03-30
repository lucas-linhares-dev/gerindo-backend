const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())

const Usuario = require('../../models/Usuario')

const Alimento = require('../../models/Alimento')


router.get('/alimentos', async (req, res) => {
    const alimentos = await Alimento.find()

    res.json(alimentos)
});

router.get('/alimentos/:id', async (req,res) => {
  const id = req.params.id
  const alimento = await Alimento.findOne({_id : id})

  res.json(alimento)
})

router.post('/alimentos', (req, res) => {
  const {nome, categoria, cor, textura} = req.body

  const novoAlimento = {
    nome: nome,
    caregoria: categoria,
    cor: cor,
    textura: textura
  }

  Alimento.create(novoAlimento)
  res.json({message: 'Alimento cadastrada.'})
})

module.exports = router




