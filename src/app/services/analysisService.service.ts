import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { AnalysisServiceRequest, AnalysisServiceResponse } from '../model/analysis.model';

@Injectable({
    providedIn: 'root'
})
export class AnalysisService {
    // Note: This is a sample URL and should be replaced with the actual AI model endpoint
    private API_URL = environment.apiUrl;
    private API_KEY = environment.apiKey;

    constructor(private http: HttpClient) { }

    analyzeUser(data: AnalysisServiceRequest): Observable<AnalysisServiceResponse> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json'
        });

        const prompt = this.createPrompt(data);

        const payload = {
            // e.g.
            model: "deepseek-chat",
            messages: [
                { "role": "system", "content": "You are a health and nutrition expert providing detailed and useful analysis." },
                { "role": "user", "content": prompt }
            ],
            temperature: 0.7,
            max_tokens: 1000
        };

        return this.http.post<any>(this.API_URL, payload, { headers })
            .pipe(
                map(response => this.parseAnalysisServiceResponse(response)),
                catchError(error => {
                    console.error('API Error:', error);
                    return throwError(() => new Error('Error fetching analysis from AI service'));
                })
            );
    }

    private createPrompt(data: AnalysisServiceRequest): string {
        const bmiCategory = this.getBMICategory(data.bmi);

        return `
            Please analyze the following BMI data and provide appropriate recommendations:
            
            User information:
            - Gender: ${data.gender === 'male' ? 'Male' : 'Female'}
            - Age: ${data.age} years
            - Weight: ${data.weight} kg
            - Height: ${data.height} cm
            
            Calculated results:
            - BMI: ${data.bmi.toFixed(2)}
            - Category: ${bmiCategory}
            
            Please provide your analysis in the following format:
            1. Analysis of current BMI status and its meaning
            2. Health risks associated with this status
            3. Suitable dietary recommendations
            4. Exercise and physical activity recommendations
            5. Overall plan to improve or maintain current condition
            
            Provide the response in English, clearly and in a structured format.
        `;
    }

    private getBMICategory(bmi: number): string {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal";
        if (bmi < 30) return "Overweight";
        return "Obese";
    }

    private parseAnalysisServiceResponse(response: any): AnalysisServiceResponse {
        const content = response.choices[0].message.content;

        const analysis = content;
        const recommendations = this.extractRecommendations(content);

        return {
            analysis,
            recommendations
        };
    }

    private extractRecommendations(content: string): string[] {
        const lines = content.split('\n');
        const recommendations: string[] = [];

        lines.forEach(line => {
            if (line.trim().match(/^(\d+[\.\)]|-|\*)/) || line.toLowerCase().includes('recommendation')) {
                recommendations.push(line.trim());
            }
        });

        if (recommendations.length === 0 && content.length > 0) {
            const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
            return sentences.slice(0, 5);
        }

        return recommendations.slice(0, 5);
    }
}
