const express = require('express');

function createRouter(db) {
  const router = express.Router();


  // the routes are defined here

router.post('/profit', (req, res, next) => {
  let articles =req.body;
  for (let i=0; i<articles.length;i++)
  {
  db.query(
    'INSERT INTO profitDetaille (nom_article, qte_achetee) VALUES (?,?)',
    [articles[i].nom, articles[i].quantite_achetee],
    (error, results) => {
      if (error) {
        return res.status(500);
        res.end()
      } 
    }
  );
  }
  return res.status(200).json({status: articles});
});

//GetAllprofitDetaille
  router.get('/profitDetaille', function (req, res, next) {
  db.query(
    'SELECT nom_article,qte_achetee,date FROM profitDetaille',
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

    return router;
}

  
module.exports = createRouter;