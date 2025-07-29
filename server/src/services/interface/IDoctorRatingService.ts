

export interface IData {
    appointmentId: string;
    userId: string;
    doctorId: string;
    rating: number;
    review?: string;

} 

export interface IRatingByDoctor {
    userName: string;
    rating: number;
    review?: string;
    time: Date;
}

export interface IRatingByDoctorPaginated {
     currentPage: number
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    data: IRatingByDoctor[];
}


export interface IDoctorRatingService {
     rateDoctor(data: IData): Promise<void>;
     getRatingByDoctor(doctorId: string, page: number, limit: number): Promise<IRatingByDoctorPaginated>;
}