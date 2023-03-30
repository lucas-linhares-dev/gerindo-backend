const express = require('express')
const cors = require('cors')
const router = express.Router()

router.use(express.json())
router.use(cors())


const Usuario = require('../../models/Usuario')

const Textura = require('../../models/Textura')


router.get('/texturas', async (req, res) => {
    const texturas = await Textura.find()

    res.json(texturas)
});

router.get('/texturas/:id', async (req,res) => {
  const id = req.params.id
  const texturas = await Textura.findOne({_id : id})

  res.json(texturas)
})

router.post('/texturas', (req, res) => {
  const {nome} = req.body

  const novaTextura = {
    nome: nome,
  }

  Textura.create(novaTextura)
  res.json({message: 'Textura cadastrada.'})
})



module.exports = router