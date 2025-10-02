import { Component, effect, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
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
  //Informacion de la ruta activa
  activatedRoute = inject(ActivatedRoute);
  //Lo que el usurio habia buscado
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

  constructor() {
    effect(() => {
      const countries = this.countryResource.value();
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

  /**
   * Obtenemos el recurso
   */
  countryResource = rxResource<CountryI[], { query: string }>({
    params: () => ({
      query: this.query()
    }),
    stream: ({ params }) => {
      console.log({ query: params.query });
      if (!params.query) {
        return of([]); //Devuelve un observable que tiene un array vacio
      }
      return this.#countryService.searchByCapital(params.query);
    },
  });

}
