const fs = require('fs');
const path = require('path');
const Product = require('../models/product');
const csvParser = require('csv-parser');

exports.uploadCSV = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'CSV file is required' });
    }

    const filePath = path.resolve(req.file.path);
    const products = [];

    try {
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                // Optional: Add validation on the row before pushing it to products array
                if (row['Campaign Name'] && row['Ad Group ID'] && row['FSN ID'] && row['Campaign ID']) {
                    products.push({
                        campaignID: row['Campaign ID'],
                        campaignName: row['Campaign Name'],
                        adGroupID: row['Ad Group ID'],
                        fsnID: row['FSN ID'],
                        productName: row['Product Name'],
                        adSpend: parseFloat(row['Ad Spend']) || 0,
                        views: parseInt(row['Views'], 10) || 0,
                        clicks: parseInt(row['Clicks'], 10) || 0,
                        directRevenue: parseFloat(row['Direct Revenue']) || 0,
                        indirectRevenue: parseFloat(row['Indirect Revenue']) || 0,
                        directUnits: parseInt(row['Direct Units'], 10) || 0,
                        indirectUnits: parseInt(row['Indirect Units'], 10) || 0,
                    });
                }
            })
            .on('end', async () => {
                try {
                    for (const product of products) {
                        await Product.findOrCreate({
                            where: {
                                campaignID: product.campaignID,
                                adGroupID: product.adGroupID,
                                fsnID: product.fsnID,
                                campaignName: product.campaignName
                            },
                            defaults: product
                        });
                    }
                    res.status(201).json({ message: 'Products uploaded successfully' });
                } catch (error) {
                    res.status(500).json({ error: 'Failed to insert products into database', details: error.message });
                } finally {
                    fs.unlinkSync(filePath); // Clean up the uploaded file
                }
            })
            .on('error', (error) => {
                res.status(500).json({ error: 'Failed to parse CSV file', details: error.message });
                fs.unlinkSync(filePath); // Clean up the uploaded file in case of error
            });
    } catch (error) {
        res.status(500).json({ error: 'Unexpected error occurred', details: error.message });
        fs.unlinkSync(filePath); // Clean up the uploaded file
    }
};

exports.getProductsCount = async (req, res) => {
    try {
        const count = await Product.count();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product count', details: error.message });
    }
}