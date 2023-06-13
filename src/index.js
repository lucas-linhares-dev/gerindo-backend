require('dotenv').config()
const express = require('express')
const cors = require('cors')
const server = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');

server.use(bodyParser.json({ limit: '10mb' }));
server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

server.use(express.json())
server.use(cors())

const usuariosController = require("./Usuario/usuariosController")
const categoriasController = require("./Categoria/categoriasController")
const produtosController = require("./Produto/produtosController")
const fornecedoresController = require("./Fornecedor/fornecedoresController")
const clientesController = require("./Cliente/clientesController")
const formasPagamentoController = require("./FormaPagamento/formasPagamentoController")
const entradasController = require("./Entrada/entradasController")
const vendasController = require("./Venda/vendasController")
const enderecosController = require("./Endereco/enderecosController")


server.use("/",clientesController);
server.use("/",categoriasController);
server.use("/",usuariosController);
server.use("/",produtosController);
server.use("/",fornecedoresController);
server.use("/",formasPagamentoController);
server.use("/",entradasController);
server.use("/",vendasController);
server.use("/",enderecosController)


mongoose.connect('mongodb+srv://lucas:lucas321@cluster0.pedzbgy.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    server.listen(3001);
    console.log('MongoDB conectado!')
  })
  .catch((erro) => {
    console.log(erro)
  })

