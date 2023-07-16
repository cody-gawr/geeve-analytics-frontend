export interface Dentist {
    providerId: string;
    name: string;
}

export interface DentistsListApiResponse {
    data: Dentist[]
}