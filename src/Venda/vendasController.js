const express = require('express')
const cors = require('cors')
const router = express.Router();

router.use(express.json())
router.use(cors())

const Produto = require('../../models/Produto');
const Venda = require('../../models/Venda');
const FormaPag = require('../../models/FormaPagamento');
const Cliente = require('../../models/Cliente');



router.post('/vendas', async (req, res) => {
  console.log(req.body.body)
  const { data, cliente, forma_pag, vlr_total, produtos } = req.body.body

  console.log("INSERT VENDAAAA")
  console.log(data)
  console.log(cliente)
  console.log(forma_pag)
  console.log(vlr_total)
  console.log(produtos)

  try {
    const novaVenda = new Venda({
      // codigo,
      data,
      cliente: cliente,
      forma_pag: forma_pag,
      vlr_total,
      // descricao,
      produtos: produtos
    })

    console.log(novaVenda)
    await novaVenda.save()

    produtos.forEach(async produto => {
      const produtoBanco = await Produto.findOne({ nome: produto.nome })
      let novoEstoque = produtoBanco.estoque - produto.quantidade
      await Produto.updateOne({ _id: produto.cod_ref }, { $set: { estoque: novoEstoque } })
    });

    res.status(200).json({ message: 'Venda cadastrada' })
  } catch (error) {

    res.status(500).json({ error: error })
  }
})

router.post('/venda/update', async (req, res) => {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA')
  const { _id, data, cliente, forma_pag, vlr_total, produtos } = req.body.body

  console.log(_id)
  const venda = await Venda.findOne({ _id: _id })
  venda.data = data
  venda.cliente = cliente
  venda.forma_pag = forma_pag
  venda.vlr_total = vlr_total
  venda.produtos = produtos

  console.log(venda)

  await Venda.updateOne({ _id: _id }, venda)

  res.status(200).json({ message: 'Venda cadastrada' })
})


router.get('/vendas_filter_codigo', async (req, res) => {

  const { codigo } = req.query;
  const vendas = await Venda.find()


  const vendasFiltradas = vendas.filter((venda) => venda.codigo !== '' && venda.codigo.toLowerCase().includes(codigo.toLowerCase()))

  const objResponse = {
    vendas: vendasFiltradas,
    length: vendasFiltradas.length
  }

  if (vendasFiltradas.length === 0) {
    res.json(objResponse)
  } else {
    res.status(200).json(objResponse)
  }
})


router.get('/vendas/getAll', async (req, res) => {
  console.log("GET VENDAS")
  try {
    const vendas = await Venda.find()
    const formasPag = await FormaPag.find()
    const clientes = await Cliente.find()
    const vendasEnviar = []

    vendas.forEach((venda) => {
      const formaPag = formasPag.filter((formaPag) => formaPag._id == venda.forma_pag)
      const cliente = clientes.filter((cliente) => cliente._id == venda.cliente)
      const newVenda = {
        _id: venda._id,
        data: venda.data,
        produtos: venda.produtos,
        vlr_total: venda.vlr_total,
        cliente: { _id: cliente[0]._id, nome: cliente[0].nome },
        forma_pag: { _id: formaPag[0]._id, nome: formaPag[0].nome }
      }
      vendasEnviar.push(newVenda)
    });
    res.status(200).json(vendasEnviar);
  } catch (error) {
    console.log("ERRO BUSCAR VENDAS")
    res.status(500).json({ error: 'Erro ao buscar vendas' });
  }

  // const vendasFiltradas = vendas.filter((venda) => venda.codigo !== '' && venda.codigo.toLowerCase().includes(codigo.toLowerCase()))

})

router.delete('/venda/delete/:id', async (req, res) => {     // TRATAR ERROS -> TRY CATCH P/ CADA CHAMADA
  const id = req.params.id

  console.log(id)

  await Venda.deleteOne({ _id: id })
  res.status(200).json({ msg: "DEUBOM" })
})


router.get('/vendas_filter', async (req, res) => {
  const { objFilters } = req.query;

  let vendasFiltradas = await Venda.find()

  if (!objFilters) {
    const objResponse = {
      vendas: vendasFiltradas,
      length: vendasFiltradas.length
    }
    return res.status(200).json(objResponse)
  }

  if (objFilters?.dt_inicial || objFilters?.dt_final) {
    console.log(objFilters)
    if (objFilters.dt_inicial && objFilters.dt_final) {
      vendasFiltradas = vendasFiltradas.filter((venda) => {
        const vendaData = new Date(venda.data);
        return (
          vendaData >= new Date(objFilters.dt_inicial) &&
          vendaData <= new Date(objFilters.dt_final)
        );
      });
    } else if (objFilters.dt_inicial) {
      vendasFiltradas = vendasFiltradas.filter((venda) => {
        const vendaData = new Date(venda.data);
        return vendaData >= new Date(objFilters.dt_inicial);
      });
    } else if (objFilters.dt_final) {
      vendasFiltradas = vendasFiltradas.filter((venda) => {
        const vendaData = new Date(venda.data);
        return vendaData <= new Date(objFilters.dt_final);
      });
    }
  }

  if (objFilters?.cliente) {
    vendasFiltradas = vendasFiltradas.filter((venda) => venda.codigo !== '' && venda?.cliente === objFilters.cliente)
  }
  if (objFilters?.forma_pag) {
    vendasFiltradas = vendasFiltradas.filter((venda) => venda.codigo !== '' && venda?.forma_pag === objFilters.forma_pag)
  }

  const objResponse = {
    vendas: vendasFiltradas,
    length: vendasFiltradas.length
  }

  if (vendasFiltradas.length === 0) {
    res.json(objResponse)
  } else {
    res.status(200).json(objResponse)
  }
})

router.get('/vendas/filtrar', async (req, res) => {
  console.log("FILTRAR VENDAS");

  const objFilters = {
    dt_inicial: new Date(req.query.dt_inicial), // Converter para objeto Date
    dt_final: new Date(req.query.dt_final),
    cliente: req.query.cliente,
    forma_pag: req.query.forma_pag
  };

  // Ajustar as datas para o início e fim do dia
  if (objFilters?.dt_inicial) {
    objFilters.dt_inicial.setHours(0, 0, 0, 0);
  }
  if (objFilters?.dt_final) {
    objFilters.dt_final.setHours(23, 59, 59, 999);
  }

  let vendasFiltradas = await Venda.find();
  if (objFilters?.dt_inicial || objFilters?.dt_final) {
    if (objFilters.dt_inicial && objFilters.dt_final) {
      vendasFiltradas = vendasFiltradas.filter((venda) => {
        const vendaData = new Date(venda.data);
        return (
          vendaData >= objFilters.dt_inicial &&
          vendaData <= objFilters.dt_final
        );
      });
    } else if (objFilters.dt_inicial) {
      vendasFiltradas = vendasFiltradas.filter((venda) => {
        const vendaData = new Date(venda.data);
        return vendaData >= objFilters.dt_inicial;
      });
    } else if (objFilters.dt_final) {
      vendasFiltradas = vendasFiltradas.filter((venda) => {
        const vendaData = new Date(venda.data);
        return vendaData <= objFilters.dt_final;
      });
    }
  }

  console.log(objFilters);

  if (objFilters.cliente !== 'null') {
    vendasFiltradas = vendasFiltradas.filter((venda) => venda._id !== '' && venda?.cliente === objFilters.cliente);
  }
  if (objFilters.forma_pag !== 'null') {
    vendasFiltradas = vendasFiltradas.filter((venda) => venda._id !== '' && venda?.forma_pag === objFilters.forma_pag);
  }

  const formasPag = await FormaPag.find();
  const clientes = await Cliente.find();
  const vendasEnviar = [];

  vendasFiltradas.forEach((venda) => {
    const formaPag = formasPag.filter((formaPag) => formaPag._id == venda.forma_pag);
    const cliente = clientes.filter((cliente) => cliente._id == venda.cliente);
    const newVenda = {
      _id: venda._id,
      data: venda.data,
      produtos: venda.produtos,
      vlr_total: venda.vlr_total,
      cliente: { _id: cliente[0]._id, nome: cliente[0].nome },
      forma_pag: { _id: formaPag[0]._id, nome: formaPag[0].nome }
    };
    vendasEnviar.push(newVenda);
  });
  res.status(200).json(vendasEnviar);
});





module.exports = router
