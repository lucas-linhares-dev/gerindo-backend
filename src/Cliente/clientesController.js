const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())

const Cliente = require('../../models/Cliente')

// CADASTRO

router.get('/clientes', async (req, res) => {
  const clientes = await Cliente.find()
  res.json(clientes)
})

router.post('/cliente/insert', async (req, res) => { 
    console.log("INSERT CLIENTE")
    console.log(req.body)
    const {nome, email, telefone, cpf, cep, endereco, bairro, numero, complemento, municipio, estado} = req.body

    console.log(numero)

    const novoCliente = {
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf,
      cep: cep,
      endereco: endereco,
      bairro: bairro,
      numero: numero,
      complemento: complemento,
      municipio: municipio,
      estado: estado
    }
    
    await Cliente.create(novoCliente)
    res.status(200).json(novoCliente)
  })

router.post('/cliente/update', async (req, res) => {  
  console.log("UPDATE CLIENTE")
  
  const {_id ,nome, email, telefone, cpf, cep, endereco, bairro, numero, complemento, municipio, estado} = req.body


  const cliente = await Cliente.findOne({_id: _id}) 

  cliente.nome = nome
  cliente.email = email
  cliente.telefone = telefone
  cliente.cpf = cpf
  cliente.cep = cep
  cliente.endereco = endereco
  cliente.bairro = bairro
  cliente.numero = numero
  cliente.complemento = complemento
  cliente.municipio = municipio
  cliente.estado = estado
  

  await Cliente.updateOne({_id: _id}, cliente)

  return res.status(200).json(cliente)
})


router.delete('/excluir_cliente', async (req, res) => {     
  const id = req.body.id 


  await Cliente.deleteOne({_id: id})
  res.status(200).json({msg: "DEUBOM"})
})


router.get('/clientes_filter_name', async (req, res) => {

    const {nome} = req.query;
    const clientes = await Cliente.find()

    const clientesFiltrados = clientes.filter((cliente) => cliente.nome.toLowerCase().includes(nome.toLowerCase()))

    const objResponse = {
      clientes: clientesFiltrados,
      length: clientesFiltrados.length
    }
      
    if(clientesFiltrados.length === 0){
    res.json(objResponse)
    } else {
    res.status(200).json(objResponse)
    }
})

module.exports = router
