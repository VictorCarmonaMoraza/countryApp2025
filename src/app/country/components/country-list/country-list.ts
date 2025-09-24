import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { CountryI } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.html',
  styleUrl: './country-list.css'
})
export class CountryList {

  countries = input.required<CountryI[]>();

  errorMessage = input<string|unknown|undefined|null>()
  isLoading = input<boolean>(false)
  isEmpty = input<boolean>(false)
}
