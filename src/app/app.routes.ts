import { Routes } from '@angular/router';
import { BmiContainerComponent } from './bmi-container/bmi-container.component';
import { BmiResultComponent } from './components/bmi-result/bmi-result.component';

export const routes: Routes = [
    {
        path: '',
        component: BmiContainerComponent
    },
    {
        path: "result",
        component: BmiResultComponent
    }
];
