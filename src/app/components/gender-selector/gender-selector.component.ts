import { NgClass } from '@angular/common';
import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-gender-selector',
  imports: [NgClass],
  templateUrl: './gender-selector.component.html',
  styleUrl: './gender-selector.component.css'
})
export class GenderSelectorComponent {

  // User Gender
  gender = signal<string>("male")

  genderValue = output<string>()

  onSelectGender(gender: string) {
    this.gender.set(gender);
    this.emitValues()
  }

  private emitValues() {
    this.genderValue.emit(this.gender());
  }
}
