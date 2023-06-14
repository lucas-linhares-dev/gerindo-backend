const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())


const Endereco = require('../../models/Endereco')


router.post('/enderecos', async (req, res) => {
  const { logradouro, bairro, localidade, UF  } = req.body

  try {
    const novoEndereco = new Endereco({
        logradouro,
        bairro,
        localidade,
        UF
    })
    await novoEndereco.save()
    res.status(200).json({message: 'Endereço cadastrado'})
  } catch (error) {

    res.status(500).json({error: error, message: 'FALHOU'})
  }
})

module.exports = router