require('dotenv').config()
const express = require('express')
const cors = require('cors')
const server = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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





server.use("/",clientesController);
server.use("/",categoriasController);
server.use("/",usuariosController);
server.use("/",produtosController);
server.use("/",fornecedoresController);
server.use("/",formasPagamentoController);
server.use("/",entradasController);
server.use("/",vendasController);











mongoose.connect('mongodb+srv://lucas:lucas321@cluster0.pedzbgy.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    server.listen(3001);
    console.log('MongoDB conectado!')
  })
  .catch((erro) => {
    console.log(erro)
  })



// const Musica = require('../models/Musica')
// const Playlist = require('../models/Playlist')
// const Usuario = require('../models/Usuario')


// Listagem de playlists abertas

// server.get('/playlists', async (req, res) => {
//     const playlist = await Playlist.find()
//     res.json(playlist)
// });


// // Listagem de playlists de um usuário

// server.get('/usuarios/:id/playlists', async (req, res) => {
//     const id = req.params.id;

//     const usuario = await Usuario.findOne({_id : id})

//     const playlistsUsuario = usuario.playlists
    
//     res.json(playlistsUsuario)
// })


// // Detalhe das playlists abertas

// server.get('/playlists/:id', async (req, res) => {
//     const id = req.params.id

//     const playlists = await Playlist.findOne({_id : id})

//     res.json(playlists)
// })


// // Detalhe playlist do usuário

// server.get('/usuarios/:idUsuario/playlists/1', async (req, res) => {

//     const idUsuario = req.params.idUsuario

//     const usuario = await Usuario.findOne({_id : idUsuario})

//     res.json(usuario.playlists[0])
    
// })


// // Cadastro 

// server.post('/usuarios', async (req, res) => {
//     const {nome} = req.body;
//     const {idade} = req.body;
//     const {email} = req.body;
//     const {senha} = req.body;

//     const novoUsuario = {
//         nome: nome,
//         idade: idade,
//         email: email,
//         senha: senha,
//         playlists: []
//     }


//     await Usuario.create(novoUsuario)
//     res.json({message: 'Usuário Cadastrado.'})
// })


// // Login

// server.get('/usuarios', async (req, res) => {
//     const email = req.query.email

//     const usuarioEncontrado = await Usuario.findOne({email: email})

//     if(usuarioEncontrado){
//       res.json(usuarioEncontrado)
//     }
//     else{
//       res.json({message: 'Usuário não encontrado.'})
//     }
    
// })


// // Alterar conta 

// server.put('/usuarios/:id', async (req, res) => {
//     const id = req.params.id

//     const usuario = await Usuario.findOne({_id: id})

//     const {nome} = req.body
//     const {idade} = req.body
//     const {email} = req.body
//     const {senha} = req.body
//     const {playlists} = req.body

//     usuario.nome = nome
//     usuario.idade = idade
//     usuario.email = email
//     usuario.senha = senha
//     usuario.playlists = playlists

//     await Usuario.updateOne({_id: id}, usuario)

//     res.json(usuario)
// })

// // Pegar um usuário

// server.get('/usuarios/:id', async (req, res) => {
//   const id = req.params.id

//   const usuario = await Usuario.findOne({_id: id})

//   res.json(usuario)
// })


// // Criar playlist

// server.post('/usuarios/:id/playlists', async (req, res) => {
//     const id = req.params.id

//     const usuario = await Usuario.findOne({_id: id})

//     const {nome} = req.body
    
//     const novaPlaylist = {
//         nome: nome,
//         capa: "/imagens/playlist-lofi.jpg",
//         musicas: []
//     }

//     usuario.playlists.push(novaPlaylist)

//     await Usuario.updateOne({_id: id}, usuario)

//     res.json(usuario.playlists)
// })


// // Adicionar música na playlists 

// server.post('/usuarios/:idUsuario/playlists/1', async (req, res) => {
//     const idUsuario = req.params.idUsuario
//     //const idMusica = req.params.idMusica
//     const musica = req.body;

//     const usuario = await Usuario.findOne({_id: idUsuario})

//     //const musicaAdicionar = await Musica.findOne({_id: idMusica})

//     usuario.playlists[0].musicas.push(musica)

//     await Usuario.updateOne({_id: idUsuario}, usuario)

//     res.json(usuario.playlists[0].musicas)

// })


// // Deletar música da playlist 

// server.delete('/usuarios/:idUsuario/playlists/1/musicas/:idMusica', async (req, res) => {
//     const idUsuario = req.params.idUsuario
//     const idMusica = req.params.idMusica

//     const usuario = await Usuario.findOne({_id: idUsuario})

//     usuario.playlists[0].musicas.splice(idMusica-1, 1)

//     await Usuario.updateOne({_id: idUsuario}, usuario)

//     res.json(usuario.playlists[0].musicas)
// })


// // Buscar músicas

// server.get('/musicas', async (req, res) => {
//     const {nome} = req.query;
//     const musicas = await Musica.find()

//     if(!nome){
//       res.json(musicas)
//     }
//     else{
//       const musicasFiltradas = musicas.filter((musica) => musica.nome.toLowerCase().includes(nome.toLowerCase()))

//       res.json(musicasFiltradas)
//     }
// })


// // Buscar uma música


// server.get('/musicas/:id', async (req, res) => {
//   const id = req.params.id

//   const musica = await Musica.findOne({_id: id})

//   res.json(musica)
// })


// // Buscar uma playlist

// server.get('/playlists/:id', async (req, res) => {
//   const id = req.params.id

//   const playlist = await Playlist.findOne({_id: id})

//   res.json(playlist)
// })


// // Adicionar música

// server.post('/musicas', (req, res) => {
//     const {nome, artista, audio} = req.body

//     const novaMusica = {
//       nome: nome,
//       artista: artista,
//       audio: audio
//     }

//     Musica.create(novaMusica)
//     res.json({message: 'Música cadastrada.'})
// })


// // Adicionar playlist

// server.post('/playlists', (req,res) => {
//     const {nome, capa, musicas} = req.body

//     const novaPlaylist = {
//       nome: nome,
//       capa: capa,
//       musicas: musicas
//     }

//     Playlist.create(novaPlaylist)
//     res.json({message: 'Playlist adicionada'})
// })



