const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const heroes = require('../../heroes');

// Gets All heroes
router.get('/', (req, res) => res.json(heroes));

// Get Single heroe
router.get('/:id', (req, res) => {
  console.log('getHeroe by id',req.params.id );
  const found = heroes.some(heroe => heroe.id === parseInt(req.params.id));

  if (found) {
    res.json(heroes.filter(heroe => heroe.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No heroe with the id of ${req.params.id}` });
  }
});

// Create heroe
router.post('/', (req, res) => {
  const newheroe = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if (!newheroe.name || !newheroe.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  heroes.push(newheroe);
  res.json(heroes);
  // res.redirect('/');
});

// Update heroe
router.put('/:id', (req, res) => {
  const found = heroes.some(heroe => heroe.id === parseInt(req.params.id));

  if (found) {
    const updheroe = req.body;
    heroes.forEach(heroe => {
      if (heroe.id === parseInt(req.params.id)) {
        heroe.name = updheroe.name ? updheroe.name : heroe.name;
        heroe.email = updheroe.email ? updheroe.email : heroe.email;

        res.json({ msg: 'heroe updated', heroe });
      }
    });
  } else {
    res.status(400).json({ msg: `No heroe with the id of ${req.params.id}` });
  }
});

// Delete heroe
router.delete('/:id', (req, res) => {
  const found = heroes.some(heroe => heroe.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'heroe deleted',
      heroes: heroes.filter(heroe => heroe.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No heroe with the id of ${req.params.id}` });
  }
});

module.exports = router;