const express = require('express');

function createRouter(db) {
  const router = express.Router();


  // the routes are defined here
//----------------------------ARTICLES-------------------------------

  //ADD
  router.post('/ajouterArticle', (req, res, next) => {
  db.query(
    'INSERT INTO articles (nom, prix_achat, prix_vente, stock, categorie) VALUES (?,?,?,?,?)',
    [req.body.nom, req.body.prix_achat, req.body.prix_vente, req.body.quantité, req.body.catégorie],
    (error) => {
      if (error) {
        console.error(error);
        return res.status(500);
      } else {
        return res.status(200).json({status: 'ok'});
      }
    }
  );
});
  //UPDATE
  router.put('/update', function (req, res, next) {
  db.query(
    'UPDATE articles SET prix_achat=?, prix_vente=?,stock=? WHERE nom=?',
    [req.body.prix_achat, req.body.prix_vente, req.body.quantité,req.body.nom],
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
  //UPDATEACHAT
  router.put('/updateAchat', function (req, res, next) {
  db.query(
    'UPDATE articles SET quantite_vendue=quantite_vendue+?, stock=stock-? WHERE nom=?',
    [req.body.qty_vendue,req.body.qty_vendue,req.body.nom],
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

  //Delete Article Acheté
  router.put('/deleteArticleAchete', function (req, res, next) {
    console.log(req.body);
  db.query(
    'UPDATE articles SET quantite_vendue=quantite_vendue-?, stock=stock+? WHERE nom=?',
    [req.body.qty,req.body.qty,req.body.nom],
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


  
  //GetAllArticles
  router.get('/articles', function (req, res, next) {
  db.query(
    'SELECT nom,prix_achat, prix_vente,stock, quantite_vendue FROM articles ORDER BY nom',
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
  //GetAllArticlesPeinture
  router.get('/articles/peinture', function (req, res, next) {
  db.query(
    'SELECT nom, prix_achat,prix_vente,stock,quantite_vendue FROM articles where categorie="peinture" ORDER BY stock',
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
  //GetAllArticlesPVC
  router.get('/articles/pvc', function (req, res, next) {
  db.query(
    'SELECT nom, prix_achat,prix_vente,stock,quantite_vendue FROM articles where categorie="pvc" ORDER BY stock',
    (error, results) => {
      if (error) {
        return res.status(500);
      } else {
        return res.status(200).json(results);
      }
    }
  );
});
  //GetAllArticlesMenuiserie
  router.get('/articles/menuiserie', function (req, res, next) {
  db.query(
    'SELECT nom, prix_achat,prix_vente,stock,quantite_vendue FROM articles where categorie="menuiserie" ORDER BY stock',
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
  //GetAllArticlesPlomberie
  router.get('/articles/plomberie', function (req, res, next) {
  db.query(
    'SELECT nom, prix_achat,prix_vente,stock,quantite_vendue FROM articles where categorie="plomberie" ORDER BY stock',
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
//GetAllArticlesElectricité
router.get('/articles/Electricite', function (req, res, next) {
  db.query(
    'SELECT nom, prix_achat,prix_vente,stock,quantite_vendue FROM articles where categorie="Electricité" ORDER BY stock',
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
  //GetAllArticlesAutres
  router.get('/articles/autres', function (req, res, next) {
  db.query(
    'SELECT nom, prix_achat,prix_vente,stock,quantite_vendue FROM articles where categorie="autres" ORDER BY stock',
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