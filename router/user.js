const express = require('express');
const router = express.Router();

const db = require('../models/db');

router.post('/signup', db.insertUser);
router.get('/users', db.getUsers);
router.get('/users/:id',db.getUserById)

module.exports = router;
