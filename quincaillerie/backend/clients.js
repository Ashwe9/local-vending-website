const express = require('express');

function createRouter(db) {
  const router = express.Router();

//---------------------------------CLIENTS--------------------------

  //getAllCLients
  router.get('/clients', function (req, res, next) {
  db.query(
    'SELECT id,nom,surnom, numero, total FROM client',
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500);
      } else {
        return res.status(200).json(results);
      }
    }
  );
});

//getCLientByNomSurnom
router.post('/GetClientNomSurnom', function (req, res, next) {
  db.query(
    'SELECT id FROM client where nom=? AND surnom=?',
    [req.body.nom,req.body.surnom],
    (error, results) => {
      if (error) {
        return res.status(500);
      } else {
        res.status(200).json(results);
        res.end()
      }
    }
  );
});

  //ADD
  router.post('/ajouterClient', (req, res, next) => {
    if (!req.body.numero){
      req.body.numero=0;
    }
  db.query(
    'INSERT INTO client (nom, surnom, numero) VALUES (?,?,?)',
    [req.body.nom, req.body.surnom, req.body.numero],
    (error) => {
      if (error) {
        return res.status(500);
      } else {

       db.query(
        'SELECT id FROM client where nom = ? AND surnom = ? limit 1',
        [req.body.nom,req.body.surnom],
         (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500);
         } else {
            return res.status(200).json(result);
      }
       }
     );
      }
    }
  );
});

  //UPDATETotal+
  router.put('/updateTotal', function (req, res, next) {
  db.query(
    'UPDATE client SET total=total+? WHERE id=?',
    [req.body.total, req.body.id],
    (error) => {
      if (error) {
        return res.status(500);
        return(error);
      } else {
        return res.status(200).json({status: 'ok'});
      }
    }
  );
});

  //UPDATETotal-
  router.put('/total-', function (req, res, next) {
  db.query(
    'UPDATE client SET total=total-? WHERE id=?',
    [req.body.total, req.body.id],
    (error) => {
      if (error) {
        return res.status(500);
        return(error);
      } else {
        return res.status(200).json({status: 'ok'});
      }
    }
  );
});


 

  return router;
}

  module.exports = createRouter;