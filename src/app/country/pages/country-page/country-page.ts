import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../services/country';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.html',
  styleUrl: './country-page.css'
})
export class CountryPage {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  readonly #countryService = inject(Country)

  countryResource = rxResource({
    params:()=>({code: this.countryCode}),
    stream:({params}) =>{
      return this.#countryService.searchByCapitalByAlphaCode(params.code);
    }
  })

}
