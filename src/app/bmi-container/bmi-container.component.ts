import { Component, inject, signal } from '@angular/core';
import { GenderSelectorComponent } from "../components/gender-selector/gender-selector.component";
import { HeightSelectorComponent } from "../components/height-selector/height-selector.component";
import { AgeWeightSelectorComponent } from "../components/age-weight-selector/age-weight-selector.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-bmi-container',
  imports: [GenderSelectorComponent, HeightSelectorComponent, AgeWeightSelectorComponent],
  templateUrl: './bmi-container.component.html',
  styleUrl: './bmi-container.component.css'
})
export class BmiContainerComponent {

  private router = inject(Router)

  gender = signal<string>('male');
  height = signal<number | null>(170);
  ageAndWeight = signal<{ age: number; weight: number } | null>(null)

  calculate() {
    console.log('Gender:', this.gender());
    console.log('Height:', this.height());
    console.log('Age & Weight:', this.ageAndWeight());

    if (this.height() && this.ageAndWeight() && this.ageAndWeight()?.weight != null) {
      const bmi = this.ageAndWeight()!.weight / ((this.height()! / 100) ** 2);
      console.log('BMI:', bmi.toFixed(2));

      this.router.navigate(['/result'], {
        state: {
          gender: this.gender(),
          height: this.height(),
          age: this.ageAndWeight()!.age,
          weight: this.ageAndWeight()!.weight,
          bmi: bmi
        }
      })
    }
  }
}
