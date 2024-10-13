import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './config/db.js';

dotenv.config({path: './config.env'});

connectDB();

const host = process.env.HOST;
const port = process.env.PORT;

app.listen(port, host, () => {
  console.log(`Server is running in http://${host}:${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});