export type VehicleStatus = 'online' | 'idle' | 'offline';

export interface Vehicle {
  id: string;
  name: string;
  plateNumber: string;
  driver: string;
  status: VehicleStatus;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  speed: number;
  lastUpdate: string;
  fuelLevel: number;
  odometer: number;
}
