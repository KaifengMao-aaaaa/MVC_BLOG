import dotenv from 'dotenv';
dotenv.config();
export default {
  HOST: process.env.DB_HOST,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_NAME,
  USER: process.env.DB_USER,
  PORT: Number(process.env.DB_PORT),
};
