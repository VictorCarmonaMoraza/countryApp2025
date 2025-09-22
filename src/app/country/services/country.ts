import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


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
  searchByCapital(query: string) {
    query = query.toLowerCase();

    return this.http.get(`${API_URL}/capital/${query}`)
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();

    return this.http.get(`${API_URL}/name/${query}`)
  }

}
