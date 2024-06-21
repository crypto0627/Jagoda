export interface ApplicationUser {
    id?: string;
    email: string;
    userName: string;
  }
  
  export interface TravelPackage {
    id?: number;
    name: string;
    description: string;
    price: number;
    location: string;
    imageUrl: string;
    bookings?: Booking[];
  }
  
  export interface Booking {
    id?: number;
    userId: string;
    travelPackageId: number;
    bookingDate: string;
    totalPrice: number;
    user?: ApplicationUser;
    travelPackage?: TravelPackage;
  }
  