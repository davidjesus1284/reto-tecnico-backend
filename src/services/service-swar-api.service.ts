import { configLoader } from "../config-service/config-loader/config-loader";
import { HttpClient } from "../http-services/http-service";
import { IDataSwarAPI } from "../interfaces/data-swar-api.interface";
import { TranslatedObject } from "../types/object-translate.type";

export class ServiceSwarApi {
  private httpService: HttpClient;
  private url: string;

  constructor() {
    this.url = configLoader().url;
    this.httpService = new HttpClient(this.url);
  }

  public async getData() {
    const response = await this.httpService.get<IDataSwarAPI>(
      `${this.url}/planets/1/`
    );
    const newDataTranslated = {
      status: response.status,
      data: this.translateKeysToSpanish(response.data),
    };
    return newDataTranslated;
  }

  private translateKeysToSpanish(obj: any) {
    const newTranslated: TranslatedObject = {};
    const translated = this.translated();

    for (const key in obj) {
      if (key in translated) {
        const newKey = translated[key];
        newTranslated[newKey] = obj[key];
      } else {
        newTranslated[key] = obj[key];
      }
    }

    return newTranslated;
  }

  private translated() {
    const translations: { [key: string]: string } = {
      name: "nombre",
      rotation_period: "periodo_rotacion",
      orbital_period: "periodo_orbital",
      diameter: "diametro",
      climate: "clima",
      gravity: "gravedad",
      terrain: "terreno",
      surface_water: "agua_superficial",
      population: "poblacion",
      residents: "residentes",
      films: "peliculas",
      created: "creado",
      edited: "editado",
      url: "url",
    };

    return translations;
  }
}
