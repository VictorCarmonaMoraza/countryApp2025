import { Component, inject, resource, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { SearchInput } from "../../components/search-input/search-input";
import type { CountryI } from '../../interfaces/country.interface';
import { Country } from '../../services/country';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
  styleUrl: './by-capital-page.css'
})
export class ByCapitalPage {

  readonly #countryService = inject(Country)
  query = signal('')
  countryResource = resource({
    params: () => ({
      query: this.query()
    }),
    loader: async ({ params }) => {
      if (!params.query) return [];

      //Si tenemos respuesta
      return await firstValueFrom( this.#countryService.searchByCapital(params.query))
    }
  })


  // isLoading = signal(false)
  // isError = signal<string | null>(null)
  // countries = signal<CountryI[]>([])

  // onSearch(query: string) {
  //   //Si isLoading esta en true que no haga nada
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.#countryService.searchByCapital(query)
  //     .subscribe({
  //       next: (countries) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries);
  //       },
  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //       error:(err)=>{
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.isError.set(`${err}`)
  //       }
  //     })
  //   console.log(query)
  // }
}
