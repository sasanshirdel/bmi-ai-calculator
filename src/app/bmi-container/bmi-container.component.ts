import { Component } from '@angular/core';
import { GenderSelectorComponent } from "../components/gender-selector/gender-selector.component";
import { HeightSelectorComponent } from "../components/height-selector/height-selector.component";
import { AgeWeightSelectorComponent } from "../components/age-weight-selector/age-weight-selector.component";

@Component({
  selector: 'app-bmi-container',
  imports: [GenderSelectorComponent, HeightSelectorComponent, AgeWeightSelectorComponent],
  templateUrl: './bmi-container.component.html',
  styleUrl: './bmi-container.component.css'
})
export class BmiContainerComponent {

}
