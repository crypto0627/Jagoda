import axios from 'axios';
import { ApplicationUser, TravelPackage, Booking } from './interfaces';

const apiClient = axios.create({
  baseURL: '/api', // 代理到 /api 路徑
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = (email: string, password: string) => apiClient.post('/account/login', { email, password });
export const logoutUser = () => apiClient.post('/account/logout');

export const getUsers = () => apiClient.get<ApplicationUser[]>('/users');
export const getUserById = (id: string) => apiClient.get<ApplicationUser>(`/users/${id}`);
export const createUser = (email: string, username: string, password: string) => apiClient.post<ApplicationUser>('/users', { email, username, password });
export const updateUser = (id: string, user: ApplicationUser) => apiClient.put<void>(`/users/${id}`, user);
export const deleteUser = (id: string) => apiClient.delete<void>(`/users/${id}`);

export const getTravelPackages = () => apiClient.get<TravelPackage[]>('/travelpackages');
export const getTravelPackageById = (id: number) => apiClient.get<TravelPackage>(`/travelpackages/${id}`);
export const createTravelPackage = (travelPackage: TravelPackage) => apiClient.post<TravelPackage>('/travelpackages', travelPackage);
export const updateTravelPackage = (id: number, travelPackage: TravelPackage) => apiClient.put<void>(`/travelpackages/${id}`, travelPackage);
export const deleteTravelPackage = (id: number) => apiClient.delete<void>(`/travelpackages/${id}`);

export const getBookings = () => apiClient.get<Booking[]>('/bookings');
export const getBookingById = (id: number) => apiClient.get<Booking>(`/bookings/${id}`);
export const createBooking = (booking: Booking) => apiClient.post<Booking>('/bookings', booking);
export const updateBooking = (id: number, booking: Booking) => apiClient.put<void>(`/bookings/${id}`, booking);
export const deleteBooking = (id: number) => apiClient.delete<void>(`/bookings/${id}`);
