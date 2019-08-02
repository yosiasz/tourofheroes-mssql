const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const sql = require('mssql')
const config = require('../../config/mssql')

// Gets All heroes
router.get('/', (req, res) => {

    for (var key in req.body) {
      if(req.body[key] === '' ) {
          req.body[key] = null;
          }
    }
    
    const pool2 = new sql.ConnectionPool(config, err => {
      // ... error checks
      pool2.on('error', err => {
          console.log('ConnectionPool', err);
      })
    
      pool2.request() //
      .execute('dbo.heroes_sp', (err, result) => {
          // ... error checks
          if (err){
            console.log('ConnectionPool', err);

          } else {
            res.send(result.recordsets[0])

          }
      })
    })

})

// Get Single heroe
router.get('/:id', (req, res) => {
  
  for (var key in req.body) {
    if(req.body[key] === '' ) {
        req.body[key] = null;
        }
  }
  
  const pool2 = new sql.ConnectionPool(config, err => {
    pool2.on('error', err => {
        console.log('ConnectionPool', err);
    })
  
    pool2.request() 
    .input('id', sql.Int, req.params.id)
    .execute('dbo.heroes_sp', (err, result) => {
      if (err){
        console.log('ConnectionPool', err);

      } else {
        //use recordset for single record return none array [].
        res.send(result.recordset[0])
      }
    })
  })
});

// Create heroe
router.post('/', (req, res) => {
  const newheroe = {
    name: req.body.name
  };

  if (!newheroe.name) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }
  
  const pool = new sql.ConnectionPool(config, err => {
    // ... error checks
    pool.on('error', err => {
        console.log('ConnectionPool', err);
    })
    
    pool.request() //
    .input('name', req.body.name)
    .execute('dbo.heroes_ip', (err, result) => {
        // ... error checks
        console.log('ConnectionPool', err);        
    })
  })
});

// Update heroe
router.put('/:id', (req, res) => {  
  const updheroe = req.body;

  const pool = new sql.ConnectionPool(config, err => {
    // ... error checks
    pool.on('error', err => {
        console.log('ConnectionPool', err);
    })
 
    var updateheroetvp = new sql.Table('heroType');
    updateheroetvp.columns.add('id', sql.Int, {nullable: true, primary: true});
    updateheroetvp.columns.add('name', sql.NVarChar(150), {nullable: false, primary: false});    
    updateheroetvp.rows.add(req.params.id,
                            updheroe.name
                            );
  
    pool.request() //
    .input('herotype', updateheroetvp)
    .execute('dbo.heroes_up', (err, result) => {
      if(err){
        res.status(500).json({ error: err })       
      } else {
        res.status(200).json({ 
          msg: 'heroe updated', updheroe 
         })       
      }    
    })
  })
});

// Delete heroe
router.delete('/:id', (req, res) => {
  const pool = new sql.ConnectionPool(config, err => {
    // ... error checks
    pool.on('error', err => {
        console.log('ConnectionPool', err);
    })
 
    pool.request() //
    .input('id', req.params.id)
    .execute('dbo.heroes_dp', (err, result) => {
        if(err){
          res.status(500).json({ error: err })       
        } else {
          res.status(200).json({ 
            msg: 'heroe deleted'
           })       
        }
        
    })
  })
  
});

module.exports = router;