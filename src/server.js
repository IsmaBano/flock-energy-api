const app = require("./app");
const { port } = require("./config/env");

app.listen(port, () => {
  console.log(
    `Flock Energy API running on http://localhost:${port}`
  );

  console.log(
    `Swagger docs: http://localhost:${port}/docs`
  );
});