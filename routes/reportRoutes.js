const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// API 1: Retrieve product statistics filtered by Campaign Name
router.post('/campaign', reportController.getByCampaignName);

// API 2: Retrieve product statistics filtered by Ad Group ID
router.post('/adGroupID', reportController.getByAdGroupID);

// API 3: Retrieve product statistics filtered by FSN ID
router.post('/fsnID', reportController.getByFSNID);

// API 4: Retrieve product statistics filtered by Product Name
router.post('/productName', reportController.getByProductName);

module.exports = router;
