const express = require('express');
const router = express.Router();

const {createProperty} = require('../controllers/propertyController');
const {getProperty} = require('../controllers/propertyController');

router.post('/',createProperty);
router.get('/',getProperty)

module.exports = router;