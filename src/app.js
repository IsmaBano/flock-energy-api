const express = require("express");
const swaggerUi = require("swagger-ui-express");

const meterRoutes = require("./routes/meter.route");
const healthRoutes = require("./routes/health.route");
const errorHandler = require("./errors/errorHandler");

const openapi = require("../openapi.json");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Flock Energy - Urja Meter Ops API",
    version: "1.0.0",
    docs: "/docs",
    openapi: "/openapi.json"
  });
});

app.use("/health", healthRoutes);

app.use(
  "/api/v1/meters",
  meterRoutes
);

app.get("/openapi.json", (req, res) => {
  res.json(openapi);
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(openapi)
);

app.use(errorHandler);

module.exports = app;