const express = require('express');
const app = express();

app.use(express.json());

const categoryRoutes = require('./routes/categories');
app.use('/api/v1/categories', categoryRoutes);

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
