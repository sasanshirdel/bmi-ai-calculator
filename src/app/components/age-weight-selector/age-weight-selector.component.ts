import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-age-weight-selector',
  imports: [],
  templateUrl: './age-weight-selector.component.html',
  styleUrl: './age-weight-selector.component.css'
})
export class AgeWeightSelectorComponent {


  age = signal(18);
  weight = signal(70);

  increaseAge() {
    this.age.update(val => val + 1);
  }

  decreaseAge() {
    if (this.age() > 0) {
      this.age.update(val => val - 1);
    }
  }

  increaseWeight() {
    this.weight.update(val => val + 1);
  }

  decreaseWeight() {
    if (this.weight() > 0) {
      this.weight.update(val => val - 1);
    }
  }

  onAgeInput(value: string) {
    this.age.set(Number(value));
  }

  onWeightInput(value: string) {
    this.weight.set(Number(value));
  }
}
