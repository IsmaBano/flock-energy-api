const {
  parseMetersFromHtml
} = require("../src/parsers/meter.parser");

describe("meter parser", () => {
  test("parses meter table", () => {
    const html = `
      <table>
        <thead>
          <tr>
            <th>Meter</th>
            <th>Serial</th>
            <th>Make</th>
            <th>Phase</th>
            <th>Status</th>
            <th>DT</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <a href="/meters/J100000">
                J100000
              </a>
            </td>
            <td>SE33962</td>
            <td>HPL</td>
            <td>single</td>
            <td>Decommissioned</td>
            <td>DT-001</td>
          </tr>
        </tbody>
      </table>
    `;

    const result = parseMetersFromHtml(html);

    expect(result).toHaveLength(1);

    expect(result[0]).toEqual({
      id: "J100000",
      serialNumber: "SE33962",
      make: "HPL",
      phase: "single",
      status: "Decommissioned",
      distributionTransformer: "DT-001"
    });
  });
});