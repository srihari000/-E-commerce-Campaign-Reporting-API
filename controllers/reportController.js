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

// API 1: Retrieve product statistics filtered by Campaign Name
exports.getByCampaignName = async (req, res) => {
    try {
        const { campaignName, adGroupID, fsnID, productName } = req.body;

        // Build the query with the passed filters
        const filters = buildFilterQuery({ campaignName, adGroupID, fsnID, productName });

        console.log('FILTERS', filters);
        const stats = await Product.findAll({
            where: filters,
        });

        return res.json({ data: stats });
    } catch (error) {
        console.error('Error retrieving campaign report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// API 2: Retrieve product statistics filtered by Ad Group ID
exports.getByAdGroupID = async (req, res) => {
    try {
        const { adGroupID, campaignName, fsnID, productName } = req.body;

        const filters = buildFilterQuery({ adGroupID, campaignName, fsnID, productName });

        const stats = await Product.findAll({
            where: filters,
        });

        return res.json({ data: stats });
    } catch (error) {
        console.error('Error retrieving ad group report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// API 3: Retrieve product statistics filtered by FSN ID
exports.getByFSNID = async (req, res) => {
    try {
        const { fsnID, campaignName, adGroupID, productName } = req.body;

        const filters = buildFilterQuery({ fsnID, campaignName, adGroupID, productName });

        const stats = await Product.findAll({
            where: filters,
        });

        return res.json({ data: stats });
    } catch (error) {
        console.error('Error retrieving FSN report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// API 4: Retrieve product statistics filtered by Product Name
exports.getByProductName = async (req, res) => {
    try {
        const { productName, campaignName, adGroupID, fsnID } = req.body;

        const filters = buildFilterQuery({ productName, campaignName, adGroupID, fsnID });

        const stats = await Product.findAll({
            where: filters,
        });

        return res.json({ data: stats });
    } catch (error) {
        console.error('Error retrieving product name report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
