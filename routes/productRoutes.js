const express = require('express');
const { uploadCSV } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const fileUploadMiddleware = require('../middlewares/fileUploadMiddleware');

const router = express.Router();

router.post('/upload-csv', authMiddleware, fileUploadMiddleware.single('file'), uploadCSV);

module.exports = router;
