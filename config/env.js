require("dotenv").config();

const config = {
  environment: process.env.NODE_ENV || "production",
  port: Number(process.env.PORT) || 8000,
  databaseURL: process.env.DATABASE_URL,
  frontendURL: process.env.FRONTENT_URL,
  backendURL: process.env.BACKEND_URL,
  logoURL: process.env.LOGO_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  salt: Number(process.env.SALT) || 10,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  geminiApiKey: process.env.GEMINI_API_KEY,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: Number(process.env.SMTP_PORT),
  smtpUsername: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
  smtpFromEmail: process.env.SMTP_FROM_EMAIL,
};

module.exports = config;
