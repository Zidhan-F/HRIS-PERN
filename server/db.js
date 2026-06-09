const { Sequelize } = require('sequelize');
const pg = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production' || !!process.env.DATABASE_URL;

console.log('=== BACKEND STARTUP DIAGNOSTICS ===');
console.log('Node Environment:', process.env.NODE_ENV);
console.log('DATABASE_URL is defined:', !!process.env.DATABASE_URL);
console.log('GOOGLE_CLIENT_ID is defined:', !!process.env.GOOGLE_CLIENT_ID);
console.log('====================================');

if (isProduction && !process.env.DATABASE_URL) {
  throw new Error('CRITICAL: DATABASE_URL is not defined in the Production environment! Please configure it in Vercel settings.');
}

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:zidhan24@localhost:5432/ems_db', {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
  dialectOptions: isProduction ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  } : {},
  define: {
    underscored: true, // Use snake_case for all auto-generated fields
    timestamps: false,  // We manage timestamps manually
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
