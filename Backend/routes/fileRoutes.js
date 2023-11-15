const express = require('express');
const multer = require('multer');
const { uploadFile, getFile } = require('../controllers/fileController');

const router = express.Router();
const upload = multer();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/file/:filename', getFile);

module.exports = router;
