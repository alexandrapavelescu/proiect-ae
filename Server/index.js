const express = require('express');
const mysql = require('mysql');
var cors = require('cors');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'parolaroot1234',
  database: 'skincare'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql connected ...');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
     extended: true
}));

app.listen('3000', () => {
  console.log('Server started on port 3000');
});

app.get('/get-produse', (req, res) => {
  let sql = 'SELECT * from produs';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.status(200).send(result);
  });
});

app.get('/get-ingrediente/:id_produs', (req, res) => {
  let sql = "SELECT i.* from rand_ingredient r, ingredient i where r.id_ingredient = i.id_ingredient and r.id_produs = ?";
  db.query(sql, [req.params.id_produs], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.status(200).send(result);
  });
});

app.get('/get-toate-ingredientele', (req, res) => {
  let sql = "SELECT * from ingredient";
  db.query(sql , (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.status(200).send(result);
  });
});

app.get('/get-recenzii/:id_produs', (req, res) => {
  let sql = "SELECT * from recenzie where id_produs = ?";
  db.query(sql, [req.params.id_produs], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.status(200).send(result);
  });
});

app.get('/get-rating/:id_produs', (req, res) => {
  let sql = "SELECT * from rating where id_produs = ?";
  db.query(sql, [req.params.id_produs], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.status(200).send(result);
  });
});

app.get('/add-rating/:id_produs/:nota', (req, res) => {
  let sql = "INSERT INTO rating (username, id_produs, nota) values ('generic_user', ?, ?)";
  db.query(sql, [req.params.id_produs, req.params.nota], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.status(200).send(result);
  });
});

app.delete('/delete-recenzie/:id_recenzie', (req, res) => {
  let sql = "DELETE FROM recenzie WHERE id_recenzie = ?";
  db.query(sql, [req.params.id_recenzie], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.status(200).send(result);
  });
});

app.post('/add-recenzie/:id_produs', (req, res) => {
  let sql = "INSERT INTO recenzie (username, id_produs, comentariu) values (?, ?, ?)";
  db.query(sql, [req.body.username, req.params.id_produs, req.body.comentariu], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.status(200).send(result);
  });
});

app.post('/filtrare-ingrediente', (req, res) => {
  /*let ingredienteDa = req.body.ingredienteDa;
  let daStr = '';
  for (let i = 0; i < ingredienteDa.length; i++) {
    daStr = daStr + "'" + ingredienteDa[i] + "'";
    if (i != ingredienteDa.length - 1) daStr += ', ';
  }
  console.log(daStr);*/
  let sql = 'SELECT * from produs';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.status(200).send(result);
  });
});
