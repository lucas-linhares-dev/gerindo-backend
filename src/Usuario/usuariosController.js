const express = require('express')
const cors = require('cors')
const router = express.Router()

router.use(express.json())
router.use(cors())

const Usuario = require('../../models/Usuario')

router.post('/usuarios', async (req, res) => {
    console.log("ENTROOOOOUUUUUUUUUUUUUUUUUUUUUUUUUUUUU")
    const {nome, email, senha} = req.body.data

    const novoUsuario = {
      nome: nome,
      email: email,
      senha: senha
    }
  
    Usuario.create(novoUsuario)
    res.json({message: 'Usuário cadastrado'})
  })


  router.get('/usuarios', async (req, res) => {
    const usuarios = await Usuario.find()
    res.json(usuarios)
  })

  router.get('/usuarios/:id', async (req, res) => {
    const id = req.params.id
    const usuario = await Usuario.findOne({_id : id})
    res.json(usuario)
  })

  router.get('/usuarios/login/:email', async (req, res) => {
    const email = req.params.email
    const usuario = await Usuario.findOne({email: email})
    res.json(usuario)
  })


module.exports = router