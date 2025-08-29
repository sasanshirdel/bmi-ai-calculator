import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-height-selector',
  imports: [],
  templateUrl: './height-selector.component.html',
  styleUrl: './height-selector.component.css'
})
export class HeightSelectorComponent {
  heightValue = signal(170)
}
