import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../services/country';
import { NotFound } from "../../../shared/components/not-found/not-found";
import { CountryInformation } from "../country-information/country-information";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-country-page',
  imports: [NotFound, CountryInformation, JsonPipe],
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
