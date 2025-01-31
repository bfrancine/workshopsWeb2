const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: '*'
}));

//routes
/*app.get('/tipocambio', function (req, res) {
  let response = {};
  switch(req.query.type) {
    case 'usd':
      response = {
        "TipoCompraDolares" : "621",
        "TipoVentaDolares" : "621"
      }
    break;
    case 'eur':
      response = {
        "TipoCompraEuros" : "731.85",
        "TipoVentaEuros" : "761.9"
      }
    break;
    default:
      response = {
        "TipoCompraDolares" : "621",
        "TipoVentaDolares" : "621",
        "TipoCompraEuros" : "731.85",
        "TipoVentaEuros" : "761.9"
      }
    break;
  }
  res.json(response);
});*/

app.get('/tipocambio', function (req, res) {
  const type = req.query.type; //aca obtengo el parámetro
  const exchangeRates = {
    usd: {
      "TipoCompraDolares": "621",
      "TipoVentaDolares": "621"
    },
    eur: {
      "TipoCompraEuros": "731.85",
      "TipoVentaEuros": "761.9"
    }
  };

  if (type && exchangeRates[type]) {
    return res.json(exchangeRates[type]); //devuelve el tipo de cambio que se solicitó
  }
  //si no se especifica devuelve ambos
  res.json({ ...exchangeRates.usd, ...exchangeRates.eur });
});


//start the app
app.listen(3001, () => console.log(`BBCR Exchange type service listening on port 3001!`))
