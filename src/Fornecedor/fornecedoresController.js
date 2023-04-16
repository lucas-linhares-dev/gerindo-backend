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

module.exports = router