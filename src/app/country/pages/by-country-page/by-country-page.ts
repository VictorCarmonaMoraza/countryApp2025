import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CountryList } from "../../components/country-list/country-list";
import { SearchInput } from "../../components/search-input/search-input";
import { CountryI } from '../../interfaces/country.interface';
import { Country } from '../../services/country';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
  styleUrl: './by-country-page.css'
})
export class ByCountryPage {
  readonly #countryService = inject(Country)
  //Informacion de la ruta activa
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router)

  //Lo que el usurio habia buscado
  queryParam = this.#activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);


  countryResource = rxResource<CountryI[], { query: string }>({
    params: () => ({
      query: this.query()
    }),
    stream: ({ params }) => {
      if (!params.query) {
        return of([]); //Devuelve un observable que tiene un array vacio
      }
      //Actualizamo la url
      this.#router.navigate(['/country/by-country'], {
        queryParams: {
          query: params.query,
          hola: 'Victor',
          doc: 'VictorWeb'
        }
      })
      return this.#countryService.searchByCountry(params.query);
    },
  });




}


