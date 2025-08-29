import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-gender',
  imports: [],
  templateUrl: './gender-selector.component.html',
  styleUrl: './gender-selector.component.css'
})
export class GenderComponent {

  // User Gender
  gender = signal<string>("")
}
