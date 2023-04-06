const express = require('express');
const { get, getById, add } = require('./model');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await getById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await add({ user: req.body });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
