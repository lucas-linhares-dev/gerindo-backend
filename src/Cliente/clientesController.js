const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())

const Cliente = require('../../models/Cliente')

// CADASTRO

router.post('/insert_cliente', async (req, res) => { 
    const {nome, email, telefone, cpf} = req.body.data

    const novoCliente = {
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf
    }
    
    try{
      await Cliente.create(novoCliente)

      res.status(200).json(novoCliente)
    }
    catch (error) {
      res.status(500).json({error: error})
    }
  })

router.post('/update_cliente', async (req, res) => {     // TRATAR ERROS -> TRY CATCH P/ CADA CHAMADA
  const {_id ,nome, email, telefone, cpf} = req.body.data


  const cliente = await Cliente.findOne({_id: _id}) // COMPARAR POR ID -> PROBLEMA

  cliente.nome = nome
  cliente.email = email
  cliente.telefone = telefone
  cliente.cpf = cpf

  await Cliente.updateOne({_id: _id}, cliente)

  return res.status(200).json(cliente)
})


router.delete('/excluir_cliente', async (req, res) => {     // TRATAR ERROS -> TRY CATCH P/ CADA CHAMADA
  const id = req.body.id

  // const fornecedor = await Fornecedor.findOne({_id: id})
  await Cliente.deleteOne({_id: id})
  res.status(200).json({msg: "DEUBOM"})
})


  // FILTRO PELO NOME -> PARA TABELA

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
