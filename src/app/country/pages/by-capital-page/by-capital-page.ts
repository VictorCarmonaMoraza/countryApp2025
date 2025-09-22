import { Component, inject } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { Country } from '../../services/country';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
  styleUrl: './by-capital-page.css'
})
export class ByCapitalPage {

  readonly #countryService = inject(Country)

  onSearch(query: string) {
    this.#countryService.searchByCapital(query)
      .subscribe(resp => {
        console.log(resp)
      })
    console.log(query)
  }
}
