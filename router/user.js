const express = require('express');
const router = express.Router();

const db = require('../models/db');
//signup for users
router.post('/signup', db.insertUser);
// router for get the all the user details
router.get('/users', db.getUsers);
router.get('/users/:id',db.getUserById)
router.put('/users/:id',db.updateUser)
router.delete('/users/:id',db.deleteUser)

module.exports = router;
