const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())

const Fornecedor = require('../../models/Fornecedor')

router.post('/fornecedores', async (req, res) => {
    const {nome, email} = req.body.data
    const novoFornecedor = {
      nome: nome,
      email: email,
    }
  
    Fornecedor.create(novoFornecedor)
    res.status(200).json(novoFornecedor)
  })

module.exports = router