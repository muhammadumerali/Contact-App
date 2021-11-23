import express from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/contacts', contactRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Running on Port ${PORT}`));