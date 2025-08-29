import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-gender-selector',
  imports: [NgClass],
  templateUrl: './gender-selector.component.html',
  styleUrl: './gender-selector.component.css'
})
export class GenderSelectorComponent {

  // User Gender
  gender = signal<string | null>(null)

  onSelectGender(gender: string) {
    this.gender.set(gender);

  }
}
