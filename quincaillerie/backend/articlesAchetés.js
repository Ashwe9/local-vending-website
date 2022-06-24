const express = require('express');

function createRouter(db) {
  const router = express.Router();

//add
router.post('/ArticleAchete', (req, res, next) => {
  let articles =req.body;
  for (let i=0; i<articles.length;i++)
  {
  db.query(
    'INSERT INTO articlesAchetés (nom, quantite_achetee, prix_unitaire, id_client) VALUES (?,?,?,?)',
    [articles[i].nom, articles[i].quantite_achetee, articles[i].prix_unitaire,articles[i].id],
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


//GetAllArticlesAchetés
  router.get('/articlesAchetes', function (req, res, next) {
  db.query(
    'SELECT nom,prix_unitaire, quantite_achetee,id_client FROM articlesAchetés',
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

  //DELETE
  router.delete('/articleAchete', function (req, res, next) {
  db.query(
    'DELETE FROM articlesAchetés WHERE nom=? AND quantite_achetee=? AND id_client=?',
    [req.body.nom,req.body.qty,req.body.id_client],
    (error) => {
      if (error) {
        return res.status(500);
      } else {
        return res.status(200).json({status: 'ok'});
      }
    }
  );
});

    return router;
}

  module.exports = createRouter;