const Product = require('../models/product');

// Helper function to build filter query
const buildFilterQuery = (filters) => {
    let query = {};
    if (filters.campaignName) {
        query.campaignName = filters.campaignName;
    }
    if (filters.adGroupID) {
        query.adGroupID = filters.adGroupID;
    }
    if (filters.fsnID) {
        query.fsnID = filters.fsnID;
    }
    if (filters.productName) {
        query.productName = filters.productName;
    }
    return query;
};

// Function to calculate derived metrics
const additionalCalculations = (data) => {
    return data.map(item => ({
        ...item,
        ctr: item.views > 0 ? (item.clicks / item.views) * 100 : 0, // Calculate CTR%
        totalRevenue: (item.directRevenue || 0) + (item.indirectRevenue || 0), // Calculate Total Revenue
        totalOrders: (item.directUnits || 0) + (item.indirectUnits || 0), // Calculate Total Orders
        roas: item.adSpend > 0 ? ((item.directRevenue || 0) + (item.indirectRevenue || 0)) / item.adSpend : 0, // Calculate ROAS
    }));
};

// API for retrieving filtered product statistics
const getFilteredStats = async (req, res, filters) => {
    try {
        const stats = await Product.findAll({
            where: filters,
        });
        const finalResult = additionalCalculations(stats.map(stat => stat.toJSON()));
        return res.json({ data: finalResult });
    } catch (error) {
        console.error('Error retrieving report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// API 1: Retrieve product statistics filtered by Campaign Name
exports.getByCampaignName = (req, res) => {
    const { campaignName, adGroupID, fsnID, productName } = req.body;
    if (!campaignName) {
        return res.status(400).json({ error: 'Campaign Name is required' });
    }
    const filters = buildFilterQuery({ campaignName, adGroupID, fsnID, productName });
    getFilteredStats(req, res, filters);
};

// API 2: Retrieve product statistics filtered by Ad Group ID
exports.getByAdGroupID = (req, res) => {
    const { adGroupID, campaignName, fsnID, productName } = req.body;
    if (!adGroupID) {
        return res.status(400).json({ error: 'Ad Group ID is required' });
    }
    const filters = buildFilterQuery({ adGroupID, campaignName, fsnID, productName });
    getFilteredStats(req, res, filters);
};

// API 3: Retrieve product statistics filtered by FSN ID
exports.getByFSNID = (req, res) => {
    const { fsnID, campaignName, adGroupID, productName } = req.body;
    if (!fsnID) {
        return res.status(400).json({ error: 'FSN ID is required' });
    }
    const filters = buildFilterQuery({ fsnID, campaignName, adGroupID, productName });
    getFilteredStats(req, res, filters);
};

// API 4: Retrieve product statistics filtered by Product Name
exports.getByProductName = (req, res) => {
    const { productName, campaignName, adGroupID, fsnID } = req.body;
    if (!productName) {
        return res.status(400).json({ error: 'Product Name is required' });
    }
    const filters = buildFilterQuery({ productName, campaignName, adGroupID, fsnID });
    getFilteredStats(req, res, filters);
};
