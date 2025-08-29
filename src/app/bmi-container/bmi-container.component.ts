import { Component } from '@angular/core';
import { GenderComponent } from "../components/gender-selector/gender-selector.component";

@Component({
  selector: 'app-bmi-container',
  imports: [GenderComponent],
  templateUrl: './bmi-container.component.html',
  styleUrl: './bmi-container.component.css'
})
export class BmiContainerComponent {

}
