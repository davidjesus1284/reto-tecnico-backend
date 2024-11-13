import { describe } from "node:test";
import { getDataSwarApi } from "../handlers/handler";

describe("Testing handler application serverless", () => {
  const spanishKeys = [
    "nombre",
    "periodo_rotacion",
    "periodo_orbital",
    "diametro",
    "clima",
    "gravedad",
    "terreno",
    "agua_superficial",
    "poblacion",
    "residentes",
    "peliculas",
    "creado",
    "editado",
    "url",
  ];
  it("Get status 200", async () => {
    const result = await getDataSwarApi();

    expect(result.statusCode).toBe(200);
  });

  it("Validate data with translated", async () => {
    const { body } = await getDataSwarApi();
    const parsedBody = JSON.parse(body);
    spanishKeys.forEach((key) => {
      expect(parsedBody).toHaveProperty(key);
    });
  });

  test("Should not contain English keys", async () => {
    const englishKeys = [
      "name",
      "rotation_period",
      "orbital_period",
      "diameter",
      "climate",
      "gravity",
      "terrain",
      "surface_water",
      "population",
      "residents",
      "films",
      "created",
      "edited",
    ];
    const { body } = await getDataSwarApi();
    const parsedBody = JSON.parse(body);
    englishKeys.forEach((key) => {
      expect(parsedBody).not.toHaveProperty(key);
    });
  });
});
