const express = require('express')
const cors = require('cors')
const router = express.Router()
const bcrypt = require('bcrypt')


router.use(express.json())
router.use(cors())

const Usuario = require('../../models/Usuario')

router.post('/usuarios', async (req, res) => {
    const {nome, email, senha} = req.body.data
    // salt = bcrypt.genSalt(12)
    // senhaHash = await bcrypt.hash(senha, salt)
    const novoUsuario = {
      nome: nome,
      email: email,
      senha: senha,
      caixa: '0,00'
    }
  
    try {
      await Usuario.create(novoUsuario)
  
      res.status(200).json({message: 'Usuário cadastrado'})
    } catch (error) {
      res.status(500).json({error: error})
    }
  })


  router.get('/usuarios', async (req, res) => {
    const usuarios = await Usuario.find()
    res.status(200).json(usuarios)
  })

  router.get('/usuarios/:id', async (req, res) => {
    const id = req.params.id
    const usuario = await Usuario.findOne({_id : id})
    res.status(200).json(usuario)
  })

  router.post('/auth/usuarios', async (req, res) => {

    const {email, senha} = req.body.data

    const usuario = await Usuario.findOne({email: email})

    if(!usuario){
      console.log("Usuario nao encontrado")
      return res.status(422).json({msg: 'Usuário não encontrado'})
    }
    if(usuario.senha == senha){
      return res.status(200).json(usuario)
    }
    else{
      console.log("Senha incorreta")
      return res.status(422).json({msg: 'Senha incorreta'})
    }
  })


module.exports = router