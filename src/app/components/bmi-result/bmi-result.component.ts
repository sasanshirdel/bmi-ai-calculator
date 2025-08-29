// bmi-result.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe, } from '@angular/common';
import { AnalysisServiceResponse } from '../../model/analysis.model';
import { AnalysisService } from '../../services/analysisService.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-bmi-result',
  imports: [DecimalPipe, HttpClientModule],
  templateUrl: './bmi-result.component.html',
  styleUrls: ['./bmi-result.component.css']
})
export class BmiResultComponent implements OnInit {
  gender!: string;
  age!: number;
  weight!: number;
  height!: number;
  bmi!: number;
  bmiCategory!: string;

  loading = true;
  aiAnalysis: string = '';
  recommendations: string[] = [];
  error: string | null = null;

  constructor(private router: Router, private analysisService: AnalysisService) {
    const state = this.router.getCurrentNavigation()?.extras.state as any;
    if (!state) {
      this.router.navigate(['/']);
    } else {
      this.gender = state.gender;
      this.age = state.age;
      this.weight = state.weight;
      this.height = state.height;
      this.bmi = state.bmi;
      this.bmiCategory = this.getBMICategory(this.bmi);
    }
  }

  ngOnInit() {
    this.sendAnalysisService();
  }

  getBMICategory(bmi: number): string {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  }

  getStatusColor(): string {
    if (this.bmi < 18.5) return 'bg-blue-100 text-blue-800';
    if (this.bmi < 25) return 'bg-green-100 text-green-800';
    if (this.bmi < 30) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  }

  sendAnalysisService() {
    this.analysisService.analyzeUser({
      bmi: this.bmi,
      gender: this.gender,
      age: this.age,
      weight: this.weight,
      height: this.height
    }).subscribe({
      next: (res: AnalysisServiceResponse) => {
        this.aiAnalysis = res.analysis;
        this.recommendations = res.recommendations;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Error fetching analysis from AI service';
        this.loading = false;

        this.aiAnalysis = 'Unfortunately, analysis is currently unavailable. Please try again later.';
        this.recommendations = [
          'Maintain a balanced diet',
          'Engage in at least 30 minutes of physical activity daily',
          'Reduce sugar and fat intake',
          'Drink sufficient water',
          'Regularly monitor your BMI'
        ];
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
