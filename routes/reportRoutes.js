const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');

// API 1: Retrieve product statistics filtered by Campaign Name
router.post('/campaign', authMiddleware, reportController.getByCampaignName);

// API 2: Retrieve product statistics filtered by Ad Group ID
router.post('/adGroupID', authMiddleware, reportController.getByAdGroupID);

// API 3: Retrieve product statistics filtered by FSN ID
router.post('/fsnID', authMiddleware, reportController.getByFSNID);

// API 4: Retrieve product statistics filtered by Product Name
router.post('/productName', authMiddleware, reportController.getByProductName);

module.exports = router;