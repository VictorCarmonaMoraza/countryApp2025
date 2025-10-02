
import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css'
})
export class SearchInput {

  value = output<string>();
  placeholder = input('Buscar');
  debounceTime = input(300);
  initialValue = input<string>('');

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value)
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout)
    })
  })

}
