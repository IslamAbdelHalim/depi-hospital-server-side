import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASS,
);

export default async function connectDB() {
  await mongoose.connect(db);
  console.log('Successfully connected to depi database');
} 