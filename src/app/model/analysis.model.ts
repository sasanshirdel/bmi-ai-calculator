export interface AnalysisServiceRequest {
    bmi: number;
    gender: string;
    age: number;
    weight: number;
    height: number;
}

export interface AnalysisServiceResponse {
    analysis: string;
    recommendations: string[];
}