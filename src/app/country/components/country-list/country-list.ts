import { Component, input } from '@angular/core';
import type { CountryI } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.html',
  styleUrl: './country-list.css'
})
export class CountryList {

  countries = input.required<CountryI[]>()
}
