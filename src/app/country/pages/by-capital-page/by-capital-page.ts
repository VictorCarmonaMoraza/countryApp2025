import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryList } from "../../components/country-list/country-list";
import { SearchInput } from "../../components/search-input/search-input";
import { CountryI } from '../../interfaces/country.interface';
import { Country } from '../../services/country';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
  styleUrl: './by-capital-page.css'
})
export class ByCapitalPage {

  readonly #countryService = inject(Country)
  query = signal('')

  constructor() {
    effect(() => {
      const countries = this.countryResource.value(); // 👈 importante, con ()
      console.log('Countries:', countries);

      if (countries && countries.length > 0) {
        countries.forEach(c => {
          console.log('Name:', c.name);
          console.log('Capital:', c.capital);
          console.log('Población:', c.population);
          console.log('Bandera:', c.flag);
        });
      }
    });


  }

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
