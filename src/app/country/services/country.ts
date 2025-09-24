import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../components/mappers/country.mapper';
import type { CountryI } from '../interfaces/country.interface';
import { RESTCountryModel } from '../interfaces/rest-countries.interface';
import { Region } from '../interfaces/region.type';


const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class Country {

  readonly #http = inject(HttpClient)
  readonly #queryCacheCapital = new Map<string, CountryI[]>();
  readonly #queryCacheCountry = new Map<string, CountryI[]>();
  readonly #queryCacheRegion= new Map<Region, CountryI[]>();

  /**
   *
   * @param query Buscar por Capital
   * @returns
   */
  searchByCapital(query: string): Observable<CountryI[]> {
    query = query.toLowerCase();

    if (this.#queryCacheCapital.has(query)) {
      return of(this.#queryCacheCapital.get(query) ?? []);
    }

    return this.#http.get<RESTCountryModel.RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
        tap(countries => this.#queryCacheCapital.set(query, countries)),
        catchError(error => {
          console.log('Error fetching', error)

          return throwError(
            () => new Error(`No se pudo obtener paises con ese query ${query}`)
          )
        })
      );
  }

  searchByCapitalByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`

    return this.#http.get<RESTCountryModel.RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
        map(countries => countries.at(0)),
        catchError(error => {
          console.log('Error fetching', error)

          return throwError(
            () => new Error(`No se pudo obtener capitales con ese codigo ${code}`)
          )
        })
      );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();

    if (this.#queryCacheCountry.has(query)) {
      return of(this.#queryCacheCountry.get(query) ?? []).pipe(delay(5000));
    }

    return this.#http.get<RESTCountryModel.RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
        tap(countries => this.#queryCacheCountry.set(query, countries)),
        catchError(error => {
          console.log('Error fetching', error)

          return throwError(
            () => new Error(`No se pudo obtener paises con ese query ${query}`)
          )
        })
      );
  }

    searchByRegion(region: Region) {
      const url = `${API_URL}/region/${region}`;

    if (this.#queryCacheRegion.has(region)) {
      return of(this.#queryCacheRegion.get(region) ?? []).pipe(delay(5000));
    }

    return this.#http.get<RESTCountryModel.RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
        tap(countries => this.#queryCacheRegion.set(region, countries)),
        catchError(error => {
          console.log('Error fetching', error)

          return throwError(
            () => new Error(`No se pudo obtener paises con ese query ${region}`)
          )
        })
      );
  }

}
