const cheerio = require("cheerio");

function clean(value) {
  return value
    ?.replace(/\s+/g, " ")
    .trim() || null;
}

function normalizeHeader(value) {
  return clean(value)
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

function parseMetersFromHtml(html) {
  const $ = cheerio.load(html);

  const tables = $("table");

  for (let tableIndex = 0; tableIndex < tables.length; tableIndex++) {
    const table = tables.eq(tableIndex);

    const headers = [];

    table.find("thead tr th, thead tr td").each((_, element) => {
      headers.push(normalizeHeader($(element).text()));
    });

    if (!headers.length) {
      const firstRow = table.find("tr").first();

      firstRow.find("th, td").each((_, element) => {
        headers.push(normalizeHeader($(element).text()));
      });
    }

    const looksLikeMeterTable =
      headers.includes("meter") &&
      headers.includes("serial") &&
      headers.includes("make") &&
      headers.includes("phase") &&
      headers.includes("status");

    if (!looksLikeMeterTable) {
      continue;
    }

    const rows = [];

    table.find("tbody tr").each((_, row) => {
      const cells = [];

      $(row)
        .find("td")
        .each((_, cell) => {
          cells.push(clean($(cell).text()));
        });

      if (!cells.length) {
        return;
      }

      const record = {};

      headers.forEach((header, index) => {
        record[header] = cells[index] ?? null;
      });

      const meterIdElement = $(row)
        .find('a[href*="/meters/"]')
        .first();

      if (meterIdElement.length) {
        const href = meterIdElement.attr("href");

        const match = href?.match(/\/meters\/([^/?#]+)/);

        if (match) {
          record.meter_id = decodeURIComponent(match[1]);
        }
      }

      rows.push({
        id: record.meter_id || record.meter || null,
        serialNumber: record.serial || null,
        make: record.make || null,
        phase: record.phase || null,
        status: record.status || null,
        distributionTransformer: record.dt || null
      });
    });

    return rows;
  }

  return [];
}

module.exports = {
  parseMetersFromHtml
};