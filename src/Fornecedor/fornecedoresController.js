const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())

const Fornecedor = require('../../models/Fornecedor')

router.post('/fornecedores', async (req, res) => {
    const {nome, email, telefone, cnpj} = req.body.data

    const novoFornecedor = {
      nome: nome,
      email: email,
      telefone: telefone,
      cnpj: cnpj
    }
    
    try{
      await Fornecedor.create(novoFornecedor)

      res.status(200).json(novoFornecedor)
    }
    catch (error) {
      res.status(500).json({error: error})
    }
  })

router.get('/fornecedores_filter_name', async (req, res) => {

    const {nome} = req.query;
    const fornecedores = await Fornecedor.find()

    const fornecedoresFiltrados = fornecedores.filter((fornecedor) => fornecedor.nome.toLowerCase().includes(nome.toLowerCase()))

    console.log("________________________")
    console.log(fornecedoresFiltrados)
    console.log("________________________")

    const objResponse = {
      fornecedores: fornecedoresFiltrados,
      length: fornecedoresFiltrados.length
    }
      
    if(fornecedoresFiltrados.length === 0){
    console.log("FORNECEDOR NAO ENCONTRADO")
    res.json([])
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