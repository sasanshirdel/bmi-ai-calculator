import { Component, OnInit, output, signal } from '@angular/core';

@Component({
  selector: 'app-age-weight-selector',
  imports: [],
  templateUrl: './age-weight-selector.component.html',
  styleUrl: './age-weight-selector.component.css'
})
export class AgeWeightSelectorComponent implements OnInit {

  ngOnInit() {
    this.emitValues();
  }

  age = signal(18);
  weight = signal(70);

  valuesChanged = output<{ age: number; weight: number }>();

  increaseAge() {
    if (this.age() < 110) {
      this.age.update(val => val + 1);
      this.emitValues()
    }
  }

  decreaseAge() {
    if (this.age() > 0) {
      this.age.update(val => val - 1);
      this.emitValues()
    }
  }

  increaseWeight() {
    if (this.weight() < 180) {
      this.weight.update(val => val + 1);
      this.emitValues()
    }
  }

  decreaseWeight() {
    if (this.weight() > 0) {
      this.weight.update(val => val - 1);
      this.emitValues()
    }
  }

  onAgeInput(value: string) {
    this.age.set(Number(value));
    this.emitValues()
  }

  onWeightInput(value: string) {
    this.weight.set(Number(value));
    this.emitValues()
  }

  private emitValues() {
    this.valuesChanged.emit({ age: this.age(), weight: this.weight() });
  }
}


