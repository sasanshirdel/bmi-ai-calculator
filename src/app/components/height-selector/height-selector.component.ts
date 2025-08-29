import { Component, effect, output, signal } from '@angular/core';

@Component({
  selector: 'app-height-selector',
  imports: [],
  templateUrl: './height-selector.component.html',
  styleUrl: './height-selector.component.css'
})
export class HeightSelectorComponent {

  height = signal(170);

  heightValue = output<number>();

  setHeight(value: number) {
    this.height.set(value);
    this.emitHeight();
  }

  private emitHeight() {
    this.heightValue.emit(this.height());
  }
}
