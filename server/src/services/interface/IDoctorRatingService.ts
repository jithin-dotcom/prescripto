

export interface IDataDTO {
    appointmentId: string;
    userId: string;
    doctorId: string;
    rating: number;
    review?: string;

} 

export interface IRatingByDoctorDTO {
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
    data: IRatingByDoctorDTO[];
}


export interface IDoctorRatingService {
     rateDoctor(data: IDataDTO): Promise<void>;
     getRatingByDoctor(doctorId: string, page: number, limit: number): Promise<IRatingByDoctorPaginated>;
}