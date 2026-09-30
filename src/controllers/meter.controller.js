const meterService = require("../services/meter.service");

async function listMeters(req, res, next) {
  try {
    const page = Number(req.query.page || 1);
    const search = req.query.search || "";

    const result = await meterService.listMeters({
      page,
      search,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getMeter(req, res, next) {
  try {
    const meter = await meterService.getMeter(
      req.params.meterId
    );

    res.json(meter);
  } catch (error) {
    next(error);
  }
}

async function getConsumption(req, res, next) {
  try {
    const result = await meterService.getConsumption(
      req.params.meterId
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listMeters,
  getMeter,
  getConsumption,
};