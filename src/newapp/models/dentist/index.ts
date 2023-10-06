export interface Dentist {
  appBookId: number;
  clinicId: number;
  id: number;
  isActive: number;
  jeeveId: null;
  jeeveName: null;
  name: string;
  position: number;
  providerId: number;
  userId: number;
}

export interface DentistsListApiResponse {
  data: Dentist[];
}
