const express = require('express');

function createRouter(db) {
  const router = express.Router();


  // the routes are defined here

//ADD
  router.post('/totals', (req, res, next) => {
  db.query(
    'INSERT INTO profitTotal (total) VALUES (?)',
    [req.body.total],
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

  //GetAllprofitTotal
  router.get('/profitTotal', function (req, res, next) {
  db.query(
    'SELECT total,date FROM profitTotal',
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