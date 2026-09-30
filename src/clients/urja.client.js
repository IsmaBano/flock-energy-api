const axios = require("axios");
const { CookieJar } = require("tough-cookie");
const { wrapper } = require("axios-cookiejar-support");

const {
  urjaBaseUrl,
  urjaUsername,
  urjaPassword,
  requestTimeoutMs,
} = require("../config/env");

class UrjaClient {
  constructor() {
    this.jar = new CookieJar();

    this.http = wrapper(
      axios.create({
        baseURL: urjaBaseUrl,
        jar: this.jar,
        withCredentials: true,
        timeout: requestTimeoutMs,
        maxRedirects: 5,
      })
    );

    this.authenticated = false;
  }

async login() {
  console.log("Logging into Urja...");

  const body = new URLSearchParams({
    email: urjaUsername,
    password: urjaPassword,
  });

  const response = await this.http.post("/login", body.toString(), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "X-SvelteKit-Action": "true",
      Origin: urjaBaseUrl,
      Referer: `${urjaBaseUrl}/login`,
    },
  });

  console.log("Login status:", response.status);

  this.authenticated = true;

  const cookies = await this.jar.getCookies(urjaBaseUrl);

  console.log(
    "Session cookie stored:",
    cookies.some((cookie) =>
      cookie.key.includes("better-auth.session_token")
    )
  );

  return response.data;
}

  async ensureAuthenticated() {
    if (!this.authenticated) {
      await this.login();
    }
  }

  async get(path, config = {}) {
    await this.ensureAuthenticated();

    try {
      console.log("GET:", path);
      console.log("Params:", config.params);

      const response = await this.http.get(path, {
        ...config,
        headers: {
          Accept: "application/json",
          ...(config.headers || {}),
        },
      });

      console.log("Response status:", response.status);

      return response;
    } catch (error) {
      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        console.log("Session expired. Logging in again...");

        this.authenticated = false;
        await this.login();

        return this.http.get(path, {
          ...config,
          headers: {
            Accept: "application/json",
            ...(config.headers || {}),
          },
        });
      }

      throw error;
    }
  }
}

module.exports = UrjaClient;