const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())

const Fornecedor = require('../../models/Fornecedor')

// CADASTRO

router.post('/fornecedores', async (req, res) => { 
    const {nome, email, telefone, cnpj, cep, endereco, bairro, numero, complemento, municipio} = req.body.data

    const novoFornecedor = {
      nome: nome,
      email: email,
      telefone: telefone,
      cnpj: cnpj,
      cep: cep,
      endereco: endereco,
      bairro: bairro,
      numero: numero,
      complemento: complemento,
      municipio: municipio,
    }
    
    try{
      await Fornecedor.create(novoFornecedor)

      res.status(200).json(novoFornecedor)
    }
    catch (error) {
      res.status(500).json({error: error})
    }
  })

router.post('/update_fornecedor', async (req, res) => {     // 
  const {_id ,nome, email, telefone, cnpj, cep, endereco, bairro, numero, complemento, municipio} = req.body.data


  const fornecedor = await Fornecedor.findOne({_id: _id}) // 

  fornecedor.nome = nome
  fornecedor.email = email
  fornecedor.telefone = telefone
  fornecedor.cnpj = cnpj
  fornecedor.cep = cep
  fornecedor.endereco = endereco
  fornecedor.bairro = bairro
  fornecedor.numero = numero
  fornecedor.complemento = complemento
  fornecedor.municipio = municipio

  await Fornecedor.updateOne({_id: _id}, fornecedor)

  return res.status(200).json(fornecedor)
})


router.delete('/excluir_fornecedor', async (req, res) => {     
  const id = req.body.id

  await Fornecedor.deleteOne({_id: id})
  res.status(200).json({msg: "DEUBOM"})
})



router.get('/fornecedores_filter_name', async (req, res) => {

    const {nome} = req.query;
    const fornecedores = await Fornecedor.find()

    const fornecedoresFiltrados = fornecedores.filter((fornecedor) => fornecedor.nome.toLowerCase().includes(nome.toLowerCase()))

    const objResponse = {
      fornecedores: fornecedoresFiltrados,
      length: fornecedoresFiltrados.length
    }
      
    if(fornecedoresFiltrados.length === 0){
    res.json(objResponse)
    } else {
    res.status(200).json(objResponse)
    }
})

router.get('/fornecedores', async (req, res) => {
  const fornecedores = await Fornecedor.find()
  res.json(fornecedores)
})

// router.get('/fornecedores_filter_id', async (req, res) => {
//   const {id} = req.query;
//   console.log(id)

//   const fornecedor = await Fornecedor.findOne({_id: id}) 

//   console.log("________________________")
//   console.log(fornecedor)
//   console.log("________________________")

//   if(fornecedoresFiltrados.length === 0){
//     console.log("FORNECEDOR NAO ENCONTRADO")
//     res.json([])

//   } else {
//     res.status(200).json(fornecedor)
//   }
// })

module.exports = router