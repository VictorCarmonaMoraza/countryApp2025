import { Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { Country } from '../../services/country';
import { CountryI } from '../../interfaces/country.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryList } from "../../components/country-list/country-list";

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
  styleUrl: './by-country-page.css'
})
export class ByCountryPage {
  readonly #countryService = inject(Country)
  query = signal('')

  countryResource = rxResource<CountryI[], { query: string }>({
    params: () => ({
      query: this.query()
    }),
    stream: ({ params }) => {
      if (!params.query) {
        return of([]); //Devuelve un observable que tiene un array vacio
      }
      return this.#countryService.searchByCapital(params.query);
    },
  });
}


