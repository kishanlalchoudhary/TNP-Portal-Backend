const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const compression = require("compression");
const swaggerUI = require("swagger-ui-express");
const axios = require("axios");
const cron = require("node-cron");

const config = require("./config/env");
const documentation = require("./config/swagger");
const prisma = require("./config/prisma");
const app = express();

if (config.environment === "development") {
  const logger = morgan("dev");
  app.use(logger);
}

if (config.environment === "development") {
  app.use(cors());
} else {
  const whitelist = [config.frontendURL];
  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  app.use(cors(corsOptions));
}

app.use(hpp());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(documentation));

app.use("/api/v1/admins", require("./routes/admin.route"));
app.use("/api/v1/jobs", require("./routes/job.route"));
app.use("/api/v1/students", require("./routes/student.route"));
app.use("/api/v1/skills", require("./routes/skill.route"));
app.use("/api/v1/queries", require("./routes/query.route"));
app.use("/api/v1/notices", require("./routes/notice.route"));

app.use("/api/v1/users", require("./routes/user.route"));

app.get("/ping", (req, res) => {
  res.status(200).json({ success: true, message: "Pong!" });
});

app.get("/", (req, res) => {
  res.status(200).json("Server is running...");
});

// Keep server active by pinging itself every 10 minutes
cron.schedule("*/10 * * * *", async () => {
  try {
    const url = `${config.backendURL}/ping`;
    await axios.get(url);
    console.log("Pinged server to keep it active.");
  } catch (error) {
    console.error("Failed to ping server:", error.message);
  }
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(config.port, () => {
  console.log(
    `Server is running in ${config.environment} mode on port ${config.port}`
  );
});
