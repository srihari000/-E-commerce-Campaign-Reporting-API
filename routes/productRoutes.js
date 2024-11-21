const express = require('express');
const { uploadCSV, getProductsCount } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const fileUploadMiddleware = require('../middlewares/fileUploadMiddleware');
const reportRoutes = require('./reportRoutes');


const router = express.Router();

router.post('/upload-csv', authMiddleware, fileUploadMiddleware.single('file'), uploadCSV);
router.get('/count', authMiddleware, getProductsCount)
router.use('/report', reportRoutes);

module.exports = router;
