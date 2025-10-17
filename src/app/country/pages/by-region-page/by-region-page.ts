import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CountryList } from "../../components/country-list/country-list";
import { CountryI } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';
import { Country } from '../../services/country';



function validateQueryParam(queryParam: string): Region {

  queryParam = queryParam.toLowerCase();
  const validRegion: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
  };

  return validRegion[queryParam as keyof typeof validRegion] ?? 'Americas';
};

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
  styleUrl: './by-region-page.css'
})
export class ByRegionPage {
  readonly #countryService = inject(Country);
  readonly #router = inject(Router);
  //Informacion de la ruta activa
  readonly #activatedRoute = inject(ActivatedRoute);

  //Lo que el usurio habia buscado
  queryParam = (this.#activatedRoute.snapshot.queryParamMap.get('region') ?? '') as Region;
  // query = linkedSignal(() => this.queryParam);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = linkedSignal<Region | null>(() => this.queryParam ?? 'Americas');

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  regionResource = rxResource<CountryI[], { region: Region | null }>({
    params: () => ({
      region: this.selectedRegion()
    }),
    stream: ({ params }) => {
      if (!params.region) {
        return of([]); //Devuelve un observable que tiene un array vacio
      }
      //Actualizamo la url
      this.#router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.region,
          hola: 'Victor',
          doc: 'VictorWeb'
        }
      })
      return this.#countryService.searchByRegion(params.region);
    },
  });
}
