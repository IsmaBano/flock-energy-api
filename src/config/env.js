require("dotenv").config();

function required(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

module.exports = {
  port: Number(process.env.PORT || 3000),

  urjaBaseUrl: required("URJA_BASE_URL"),
  urjaUsername: required("URJA_USERNAME"),
  urjaPassword: required("URJA_PASSWORD"),

  requestTimeoutMs: Number(
    process.env.REQUEST_TIMEOUT_MS || 10000
  )
};