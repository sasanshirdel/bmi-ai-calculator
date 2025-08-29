import { Component } from '@angular/core';
import { GenderSelectorComponent } from "../components/gender-selector/gender-selector.component";
import { HeightSelectorComponent } from "../components/height-selector/height-selector.component";

@Component({
  selector: 'app-bmi-container',
  imports: [GenderSelectorComponent, HeightSelectorComponent],
  templateUrl: './bmi-container.component.html',
  styleUrl: './bmi-container.component.css'
})
export class BmiContainerComponent {

}
