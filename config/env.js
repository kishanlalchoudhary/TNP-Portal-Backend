require("dotenv").config();

const config = {
  environment: process.env.NODE_ENV || "production",
  port: Number(process.env.PORT) || 8000,
  databaseURL: process.env.DATABASE_URL,
  frontendURL: process.env.FRONTENT_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  salt: Number(process.env.SALT) || 10,
};

module.exports = config;
