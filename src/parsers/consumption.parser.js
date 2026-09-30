const cheerio = require("cheerio");

function clean(value) {
  return value
    ?.replace(/\s+/g, " ")
    .trim() || null;
}

function parseConsumptionFromHtml(html) {
  const $ = cheerio.load(html);

  const readings = [];

  $("table tbody tr").each((_, row) => {
    const cells = [];

    $(row)
      .find("td")
      .each((_, cell) => {
        cells.push(clean($(cell).text()));
      });

    if (!cells.length) {
      return;
    }

    readings.push(cells);
  });

  return readings;
}

module.exports = {
  parseConsumptionFromHtml
};