// // gemini.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, } from '@angular/common/http';
// import { Observable, catchError, map, of } from 'rxjs';
// import { environment } from './environments/environment';

// export interface AnalysisRequest {
//     bmi: number;
//     gender: string;
//     age: number;
//     weight: number;
//     height: number;
// }

// export interface AnalysisResponse {
//     analysis: string;
//     recommendations: string[];
// }

// @Injectable({
//     providedIn: 'root'
// })
// export class GeminiService {
//     private API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
//     private API_KEY = environment.geminiApiKey || 'free'; // برای تست می‌توانید از 'free' استفاده کنید

//     constructor(private http: HttpClient) { }

//     analyzeBMI(data: AnalysisRequest): Observable<AnalysisResponse> {
//         const prompt = this.createPrompt(data);

//         const payload = {
//             contents: [{
//                 parts: [{
//                     text: prompt
//                 }]
//             }],
//             generationConfig: {
//                 temperature: 0.7,
//                 maxOutputTokens: 1000,
//             }
//         };

//         // اگر API_KEY ندارید، از نسخه شبیه‌سازی شده استفاده کنید
//         if (!environment.geminiApiKey || environment.geminiApiKey === 'free') {
//             return this.mockAnalysis(data);
//         }

//         const url = `${this.API_URL}?key=${this.API_KEY}`;

//         return this.http.post<any>(url, payload).pipe(
//             map(response => this.parseGeminiResponse(response)),
//             catchError(error => {
//                 console.error('Gemini API Error:', error);
//                 return this.mockAnalysis(data);
//             })
//         );
//     }

//     private createPrompt(data: AnalysisRequest): string {
//         const bmiCategory = this.getBMICategory(data.bmi);
//         const genderText = data.gender === 'male' ? 'مرد' : 'زن';

//         return `
// لطفاً به عنوان یک متخصص تغذیه، داده‌های BMI زیر را تحلیل کرده و توصیه‌های مناسب ارائه دهید:

// مشخصات فرد:
// - جنسیت: ${genderText}
// - سن: ${data.age} سال
// - وزن: ${data.weight} کیلوگرم
// - قد: ${data.height} سانتیمتر

// نتایج محاسبات:
// - BMI: ${data.bmi.toFixed(2)}
// - وضعیت: ${bmiCategory}

// لطفاً تحلیل خود را به صورت زیر ارائه دهید:
// 1. تحلیل وضعیت فعلی BMI و معنی آن
// 2. ریسک‌های سلامتی مرتبط با این وضعیت
// 3. توصیه‌های غذایی مناسب
// 4. توصیه‌های ورزشی و فعالیت بدنی
// 5. برنامه کلی برای بهبود یا حفظ وضعیت فعلی

// پاسخ را به زبان فارسی و به صورت خوانا و ساختاریافته ارائه دهید.
//     `;
//     }

//     private parseGeminiResponse(response: any): AnalysisResponse {
//         try {
//             const text = response.candidates[0].content.parts[0].text;
//             return {
//                 analysis: text,
//                 recommendations: this.extractRecommendations(text)
//             };
//         } catch (error) {
//             console.error('Error parsing Gemini response:', error);
//             return this.createMockResponse(
//                 response.bmi,
//                 response.gender,
//                 response.age
//             );
//         }
//     }

//     private extractRecommendations(text: string): string[] {
//         const lines = text.split('\n');
//         const recommendations: string[] = [];

//         const recommendationPatterns = [
//             /^(\d+[\.\)]|\-|\*|•)\s*(.+)/,
//             /توصیه\s*:.+/,
//             /recommendation\s*:.+/i
//         ];

//         lines.forEach(line => {
//             if (recommendationPatterns.some(pattern => pattern.test(line))) {
//                 const cleanLine = line.replace(/^(\d+[\.\)]|\-|\*|•)\s*/, '').trim();
//                 if (cleanLine.length > 0) {
//                     recommendations.push(cleanLine);
//                 }
//             }
//         });

//         if (recommendations.length === 0) {
//             const sentences = text.split(/[.!?۔]+/).filter(s => s.trim().length > 20);
//             return sentences.slice(0, 3);
//         }

//         return recommendations.slice(0, 5);
//     }

//     private mockAnalysis(data: AnalysisRequest): Observable<AnalysisResponse> {
//         return of(this.createMockResponse(data.bmi, data.gender, data.age));
//     }

//     private createMockResponse(bmi: number, gender: string, age: number): AnalysisResponse {
//         const genderText = gender === 'male' ? 'آقا' : 'خانم';
//         const bmiCategory = this.getBMICategory(bmi);

//         let analysis = '';
//         let recommendations: string[] = [];

//         if (bmi < 18.5) {
//             analysis = `${genderText} محترم، با توجه به سن ${age} سال و BMI برابر با ${bmi.toFixed(1)} که در دسته کم‌وزن قرار می‌گیرد، توصیه می‌شود برنامه غذایی پرکالری و مقوی داشته باشید.`;
//             recommendations = [
//                 'افزایش مصرف غذاهای پرکالری و مغذی مانند مغزها، کره بادام زمینی و آووکادو',
//                 'مصرف ۵-۶ وعده غذایی کوچک در روز به جای ۳ وعده بزرگ',
//                 'انجام تمرینات قدرتی برای افزایش توده عضلانی'
//             ];
//         } else if (bmi < 25) {
//             analysis = `${genderText} محترم، با توجه به سن ${age} سال و BMI برابر با ${bmi.toFixed(1)} که در محدوده طبیعی قرار دارد، تبریک می‌گوییم! وزن شما ایده‌آل است.`;
//             recommendations = [
//                 'ادامه رژیم غذایی متعادل و سالم',
//                 'انجام حداقل ۱۵۰ دقیقه فعالیت بدنی متوسط در هفته',
//                 'مصرف روزانه میوه و سبزیجات تازه'
//             ];
//         } else if (bmi < 30) {
//             analysis = `${genderText} محترم، با توجه به سن ${age} سال و BMI برابر با ${bmi.toFixed(1)} که در دسته اضافه وزن قرار می‌گیرد، توصیه می‌شود برنامه کاهش وزن ملایم داشته باشید.`;
//             recommendations = [
//                 'کاهش مصرف قند و چربی‌های اشباع',
//                 'افزایش مصرف فیبر از طریق سبزیجات و غلات کامل',
//                 'انجام حداقل ۱۵۰ دقیقه فعالیت بدنی متوسط در هفته'
//             ];
//         } else {
//             analysis = `${genderText} محترم، با توجه به سن ${age} سال و BMI برابر با ${bmi.toFixed(1)} که در دسته چاقی قرار می‌گیرد، توصیه می‌شود تحت نظر متخصص برنامه کاهش وزن داشته باشید.`;
//             recommendations = [
//                 'مشاوره با متخصص تغذیه و پزشک برای دریافت برنامه کاهش وزن ایمن',
//                 'کاهش تدریجی کالری مصرفی روزانه',
//                 'افزایش فعالیت بدنی به تدریج'
//             ];
//         }

//         return { analysis, recommendations };
//     }

//     private getBMICategory(bmi: number): string {
//         if (bmi < 18.5) return "کم‌وزن";
//         if (bmi < 25) return "طبیعی";
//         if (bmi < 30) return "اضافه وزن";
//         return "چاقی";
//     }
// }