import { useState } from 'react';
import { Vehicle, VehicleStatus } from '@/types/vehicle';
import { mockVehicles } from '@/data/mockVehicles';
import VehicleList from '@/components/VehicleList';
import FleetMap from '@/components/FleetMap';
import MapboxTokenInput from '@/components/MapboxTokenInput';
import DashboardStats from '@/components/DashboardStats';

const Index = () => {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [filterStatus, setFilterStatus] = useState<VehicleStatus | 'all'>('all');
  const [mapboxToken, setMapboxToken] = useState<string>('');

  if (!mapboxToken) {
    return (
      <div className="flex items-center justify-center h-screen">
        <MapboxTokenInput onTokenSubmit={setMapboxToken} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <DashboardStats vehicles={vehicles} />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1">
          <FleetMap
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            apiToken={mapboxToken}
          />
        </div>
        <div className="w-80 flex-shrink-0">
          <VehicleList
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
