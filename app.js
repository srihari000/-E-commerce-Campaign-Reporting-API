const express = require('express');
const sequelize = require('./models/connection');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { port } = require('./config')
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"]
    }
}));


app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use((err, req, res, next) => {
    if (err.message === 'Only CSV files are allowed') {
        return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal Server Error' });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

sequelize.sync({ alter: true })
    .then(() => {
        app.listen(port, (err) => {
            if (err) {
                console.error('Error starting server:', err);
                process.exit(1);
            }
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
        process.exit(1);
    });
