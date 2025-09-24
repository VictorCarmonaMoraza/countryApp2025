import { CountryI } from "../../interfaces/country.interface";
import { RESTCountryModel } from "../../interfaces/rest-countries.interface";

export class CountryMapper {

  //static RestCountry => Country
  static mapRestCountryToCountry(restCountry: RESTCountryModel.RESTCountry): CountryI {
    return {
      capital: restCountry.capital.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      population: restCountry.population,
      region:restCountry.region,
      subregion: restCountry.subregion
    };
  }

  //static RestCountry[] => Country[]
  static mapRestCountryToCountryArray(restCountries: RESTCountryModel.RESTCountry[]): CountryI[] {
    return restCountries.map(this.mapRestCountryToCountry)
  }
}
