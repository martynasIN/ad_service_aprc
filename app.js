import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
import adRoutes from './routes/adRoutes.js'

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/ads', adRoutes);

app.get('/', (req, res)=>{
    res.send('Skelbimu API')
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Serveris veikia ant http://localhost:${port}`)
})




