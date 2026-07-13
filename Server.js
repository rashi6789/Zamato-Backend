const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const db = require('./Confiq/db');
require('./Models');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const vendorRoutes = require('./Routes/vendorRoutes');
const orderRoutes = require('./Routes/orderRoutes');

const app = express();
const PORT = Number(process.env.PORT || 8001);

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', async (req, res) => {
  res.json({ message: 'Zamato API is running' });
});



async function startServer() {
  try {
    await db.authenticate();
    console.log('Database connected successfully');

    // Creates the tables that do not exist yet. Set DB_SYNC_ALTER=true only
    // when deliberately changing an existing development schema.
    await db.sync({ alter: process.env.DB_SYNC_ALTER === 'true' });
    console.log('Database tables are ready');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();
