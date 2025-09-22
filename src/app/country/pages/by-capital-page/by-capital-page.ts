import { Component, inject, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { SearchInput } from "../../components/search-input/search-input";
import type { CountryI } from '../../interfaces/country.interface';
import { Country } from '../../services/country';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
  styleUrl: './by-capital-page.css'
})
export class ByCapitalPage {

  readonly #countryService = inject(Country)
  isLoading = signal(false)
  isError = signal<string | null>(null)
  countries = signal<CountryI[]>([])

  onSearch(query: string) {
    //Si isLoading esta en true que no haga nada
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.#countryService.searchByCapital(query)
      .subscribe((resp) => {
        this.isLoading.set(false);
        this.countries.set(resp);


      })
    console.log(query)
  }
}
