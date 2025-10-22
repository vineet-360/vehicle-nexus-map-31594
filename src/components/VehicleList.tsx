import { Vehicle, VehicleStatus } from '@/types/vehicle';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface VehicleListProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  onSelectVehicle: (vehicle: Vehicle) => void;
  filterStatus: VehicleStatus | 'all';
  onFilterChange: (status: VehicleStatus | 'all') => void;
}

const VehicleList = ({
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  filterStatus,
  onFilterChange,
}: VehicleListProps) => {
  const filteredVehicles =
    filterStatus === 'all'
      ? vehicles
      : vehicles.filter((v) => v.status === filterStatus);

  const statusCounts = {
    all: vehicles.length,
    online: vehicles.filter((v) => v.status === 'online').length,
    idle: vehicles.filter((v) => v.status === 'idle').length,
    offline: vehicles.filter((v) => v.status === 'offline').length,
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      <div className="p-4 border-b border-border bg-card">
        <h2 className="text-xl font-bold text-card-foreground mb-4">Fleet Overview</h2>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            className="justify-start"
            onClick={() => onFilterChange('all')}
          >
            <span className="font-semibold">All</span>
            <span className="ml-auto text-xs">{statusCounts.all}</span>
          </Button>
          <Button
            variant={filterStatus === 'online' ? 'default' : 'outline'}
            className="justify-start"
            onClick={() => onFilterChange('online')}
          >
            <div className="h-2 w-2 rounded-full bg-[hsl(var(--status-online))] mr-2" />
            <span>Online</span>
            <span className="ml-auto text-xs">{statusCounts.online}</span>
          </Button>
          <Button
            variant={filterStatus === 'idle' ? 'default' : 'outline'}
            className="justify-start"
            onClick={() => onFilterChange('idle')}
          >
            <div className="h-2 w-2 rounded-full bg-[hsl(var(--status-idle))] mr-2" />
            <span>Idle</span>
            <span className="ml-auto text-xs">{statusCounts.idle}</span>
          </Button>
          <Button
            variant={filterStatus === 'offline' ? 'default' : 'outline'}
            className="justify-start"
            onClick={() => onFilterChange('offline')}
          >
            <div className="h-2 w-2 rounded-full bg-[hsl(var(--status-offline))] mr-2" />
            <span>Offline</span>
            <span className="ml-auto text-xs">{statusCounts.offline}</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredVehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            className={cn(
              'p-3 cursor-pointer transition-all hover:shadow-md border',
              selectedVehicle?.id === vehicle.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50'
            )}
            onClick={() => onSelectVehicle(vehicle)}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-card-foreground">{vehicle.name}</p>
                  <p className="text-xs text-muted-foreground">{vehicle.plateNumber}</p>
                </div>
                <StatusBadge status={vehicle.status} showLabel={false} size="md" />
              </div>

              <div className="text-xs space-y-1">
                <p className="text-muted-foreground">
                  Driver: <span className="text-card-foreground font-medium">{vehicle.driver}</span>
                </p>
                <p className="text-muted-foreground">
                  Speed: <span className="text-card-foreground font-medium">{vehicle.speed} mph</span>
                </p>
                <p className="text-muted-foreground">
                  Updated: {formatDistanceToNow(new Date(vehicle.lastUpdate), { addSuffix: true })}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
