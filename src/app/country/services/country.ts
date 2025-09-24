import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountryModel } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import type { CountryI } from '../interfaces/country.interface';
import { CountryMapper } from '../components/mappers/country.mapper';


const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class Country {

  readonly #http = inject(HttpClient)
  readonly #queryCacheCapital = new Map<string,CountryI[]>();

  /**
   *
   * @param query Buscar por Capital
   * @returns
   */
  searchByCapital(query: string): Observable<CountryI[]> {
    query = query.toLowerCase();

    if(this.#queryCacheCapital.has(query)){
      return of(this.#queryCacheCapital.get(query) ?? []);
    }

    return this.#http.get<RESTCountryModel.RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
        tap(countries => this.#queryCacheCapital.set(query,countries)),
        catchError(error => {
          console.log('Error fetching', error)

          return throwError(
            ()=> new Error(`No se pudo obtener paises con ese query ${query}`)
          )
        })
      );
  }

  searchByCapitalByAlphaCode(code: string){
    const url = `${API_URL}/alpha/${code}`

    return this.#http.get<RESTCountryModel.RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
        map(countries=>countries.at(0)),
        catchError(error => {
          console.log('Error fetching', error)

          return throwError(
            ()=> new Error(`No se pudo obtener paises con ese codigo ${code}`)
          )
        })
      );
  }




  // searchByCountry(query: string) {
  //   query = query.toLowerCase();

  //   return this.http.get<RESTCountryModel.RESTCountry[]>(`${API_URL}/name/${query}`);

  // }


}
