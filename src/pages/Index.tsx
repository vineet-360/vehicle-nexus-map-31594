import { useState } from 'react';
import { Vehicle, VehicleStatus } from '@/types/vehicle';
import { mockVehicles } from '@/data/mockVehicles';
import VehicleList from '@/components/VehicleList';
import FleetMap from '@/components/FleetMap';
import MapboxTokenInput from '@/components/MapboxTokenInput';

const Index = () => {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [filterStatus, setFilterStatus] = useState<VehicleStatus | 'all'>('all');
  const [mapboxToken, setMapboxToken] = useState<string>('');

  if (!mapboxToken) {
    return <MapboxTokenInput onTokenSubmit={setMapboxToken} />;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <div className="w-80 flex-shrink-0">
        <VehicleList
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          onSelectVehicle={setSelectedVehicle}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />
      </div>
      <div className="flex-1">
        <FleetMap
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          apiToken={mapboxToken}
        />
      </div>
    </div>
  );
};

export default Index;
