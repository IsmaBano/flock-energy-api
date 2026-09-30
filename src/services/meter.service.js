const UrjaClient = require("../clients/urja.client");

const client = new UrjaClient();

async function listMeters({ page = 1, search = "" } = {}) {
  const response = await client.get("/portal/meters/search", {
    params: {
      q: search,
      page,
    },
  });

  return {
    data: response.data.data,
    total: response.data.total,
    page: response.data.page,
    pageSize: response.data.pageSize,
  };
}

async function getMeter(meterId) {
  let page = 1;

  while (true) {
    const result = await listMeters({ page });

    const meter = result.data.find(
      (item) => item.meterId === meterId
    );

    if (meter) {
      return meter;
    }

    if (page * result.pageSize >= result.total) {
      break;
    }

    page++;
  }

  const error = new Error(`Meter ${meterId} not found`);
  error.statusCode = 404;
  error.code = "METER_NOT_FOUND";

  throw error;
}

async function getConsumption(meterId) {
  throw new Error(
    `Consumption endpoint for ${meterId} has not been discovered yet`
  );
}

module.exports = {
  listMeters,
  getMeter,
  getConsumption,
};