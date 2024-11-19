const express = require('express');
const sequelize = require('./models/connection');
const authMiddleware = require('./middlewares/authMiddleware');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const { port } = require('./config')
const app = express();
app.use(express.json());

app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/report', authMiddleware, reportRoutes)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

sequelize.sync({ force: true })
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
