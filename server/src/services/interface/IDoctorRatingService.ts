

export interface IData {
    appointmentId: string;
    userId: string;
    doctorId: string;
    rating: number;
    review?: string;

} 


export interface IDoctorRatingService {
     rateDoctor(data: IData): Promise<void>;
}