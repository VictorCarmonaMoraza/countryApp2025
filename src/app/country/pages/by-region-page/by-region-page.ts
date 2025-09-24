import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryList } from "../../components/country-list/country-list";
import { CountryI } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';
import { Country } from '../../services/country';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
  styleUrl: './by-region-page.css'
})
export class ByRegionPage {

  readonly #countryService = inject(Country);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = signal<Region | null>(null);

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
      return this.#countryService.searchByRegion(params.region);
    },
  });
}
