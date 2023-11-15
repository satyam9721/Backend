const express = require('express');
const { extractPages } = require('../controllers/pdfController');

const router = express.Router();

router.get('/extract/:filename/:startPage/:endPage', extractPages);

module.exports = router;
