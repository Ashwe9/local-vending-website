const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const articles = require('./articles');
const clients = require('./clients');
const articlesAchetés = require('./articlesAchetés');
const transactions = require('./transactions');
const profitTotal = require('./profitTotal');
const profitDetaille = require('./profitDetaille');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'achoik',
  password : 'Azerty123',
  database : 'data'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(articles(connection))
  .use(clients(connection))
  .use(articlesAchetés(connection))
  .use(transactions(connection))
  .use(profitTotal(connection))
  .use(profitDetaille(connection));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});