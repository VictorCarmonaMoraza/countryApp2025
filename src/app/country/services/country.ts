import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountryModel } from '../interfaces/rest-countries.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import type { CountryI } from '../interfaces/country.interface';
import { CountryMapper } from '../components/mappers/country.mapper';


const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class Country {

  private http = inject(HttpClient)

  /**
   *
   * @param query Buscar por Capital
   * @returns
   */
  searchByCapital(query: string): Observable<CountryI[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountryModel.RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
        catchError(error => {
          console.log('Error fetching', error)

          return throwError(
            ()=> new Error(`No se pudo obtener paises con ese query ${query}`)
          )
        })
      );
  }






  // searchByCountry(query: string) {
  //   query = query.toLowerCase();

  //   return this.http.get<RESTCountryModel.RESTCountry[]>(`${API_URL}/name/${query}`);

  // }


}
