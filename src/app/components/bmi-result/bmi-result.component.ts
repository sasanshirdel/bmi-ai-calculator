import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bmi-result',
  imports: [DecimalPipe],
  templateUrl: './bmi-result.component.html',
  styleUrl: './bmi-result.component.css'
})
export class BmiResultComponent {
  gender!: string;
  height!: number;
  age!: number;
  weight!: number;
  bmi!: number;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state as any;

    if (state) {
      this.gender = state.gender;
      this.height = state.height;
      this.age = state.age;
      this.weight = state.weight;
      this.bmi = state.bmi;
    } else {
      // اگه مستقیم وارد صفحه شد، برگرد به فرم
      this.router.navigate(['/']);
    }
  }
}
