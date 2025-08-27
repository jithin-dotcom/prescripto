

export interface Review {
  userName: string;
  rating: number;
  review: string;
  time: string;
}

export interface RatingResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  data: Review[];
  totalReviews: number;
  averageRating: number;
  satisfactionPercent: number;
}