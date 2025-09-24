import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { CountryI } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
  styleUrl: './country-information.css'
})
export class CountryInformation{

  country = input.required<CountryI>();

  currentYear = computed(()=>{
    return new Date().getFullYear()
  })

}
