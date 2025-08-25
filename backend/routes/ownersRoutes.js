const express = require('express');
const router = express.Router();

const { createOwner } = require('../controllers/ownersController');

router.post('/', createOwner);

module.exports = router;
