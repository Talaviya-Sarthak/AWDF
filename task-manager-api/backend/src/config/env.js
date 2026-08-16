import dotenv from 'dotenv';

dotenv.config();

/**
 * Centralized environment configuration.
 * All runtime configuration is loaded from environment variables so that
 * the same code base can run in development, staging and production.
 */
const env = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  mongoUri:
    process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task_manager',
};

export default env;
