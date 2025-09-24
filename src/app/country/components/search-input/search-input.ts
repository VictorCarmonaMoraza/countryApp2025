
import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css'
})
export class SearchInput {

  value = output<string>();
  placeholder = input('Buscar')
  debounceTime =input(300)

  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value)
    }, this.debounceTime());

    onCleanup(()=>{
      clearTimeout(timeout)
    })
  })

}
