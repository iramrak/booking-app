import express, { json } from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import EventEmitter from "events";
EventEmitter.defaultMaxListeners = 20;

import eventRoutes from './routes/events.js';
import bookingRoutes from './routes/bookings.js';

dotenv.config();
const PORT = process.env.PORT || 3030;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/bookingApp')
  .then(() => console.log('MongoDB ✅'))
  .catch(err => console.error('MongoDB ❌:', err));

app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
    res.send('Booking api ✅')
})

app.listen(PORT,() => {
    console.log('Server.js ✅')
})