const express = require('express');

function createRouter(db) {
  const router = express.Router();

//ADD
router.post('/ajouterTransaction', (req, res, next) => {
  db.query(
    'INSERT INTO transactions (date, montant, id_client) VALUES (?,?,?)',
    [req.body.date, req.body.montant, req.body.id_client],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500);
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

 //GetAllTransactions
  router.get('/getTransactions', function (req, res, next) {
  db.query(
    'SELECT montant,date, id_client FROM transactions',
    (error, results) => {
      if (error) {
        res.status(500);
      } else {
        res.status(200).json(results);
      }
    }
  );
});


  return router;
}

  
module.exports = createRouter;