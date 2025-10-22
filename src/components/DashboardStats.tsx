import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Vehicle } from '@/types/vehicle';
import { 
  TrendingUp, 
  TrendingDown,
  Fuel, 
  DollarSign, 
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Car,
  Route,
  Wrench
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DashboardStatsProps {
  vehicles: Vehicle[];
}

const DashboardStats = ({ vehicles }: DashboardStatsProps) => {
  // Calculate stats
  const totalVehicles = vehicles.length;
  const onlineVehicles = vehicles.filter(v => v.status === 'online').length;
  const idleVehicles = vehicles.filter(v => v.status === 'idle').length;
  const offlineVehicles = vehicles.filter(v => v.status === 'offline').length;
  
  // Mock data for other stats
  const activeTrips = 12;
  const availableVehicles = onlineVehicles;
  const inUseVehicles = Math.floor(onlineVehicles * 0.7);
  const maintenanceVehicles = 3;
  
  const fuelCostToday = 1248.50;
  const efficiencyRate = 87;
  const revenueToday = 5432.00;
  
  const recentActivities = [
    { id: 1, type: 'trip', message: 'Vehicle FL-001 completed delivery route', time: new Date(Date.now() - 5 * 60000) },
    { id: 2, type: 'alert', message: 'Vehicle FL-003 requires maintenance check', time: new Date(Date.now() - 15 * 60000) },
    { id: 3, type: 'status', message: 'Vehicle FL-007 went online', time: new Date(Date.now() - 25 * 60000) },
    { id: 4, type: 'trip', message: 'Vehicle FL-002 started new trip to Brooklyn', time: new Date(Date.now() - 35 * 60000) },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: '3 vehicles due for maintenance', severity: 'medium' },
    { id: 2, type: 'info', message: 'All drivers have completed safety training', severity: 'low' },
  ];

  return (
    <div className="bg-background border-b border-border p-4 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Real-time Fleet Overview</h2>
        <p className="text-sm text-muted-foreground">Monitor your fleet performance and activity</p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Trips */}
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Trips</p>
              <p className="text-3xl font-bold text-foreground mt-1">{activeTrips}</p>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3" />
                <span>8% from yesterday</span>
              </p>
            </div>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Route className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        {/* Total Vehicles */}
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Vehicles</p>
              <p className="text-3xl font-bold text-foreground mt-1">{totalVehicles}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs bg-status-online/10 text-status-online border-status-online/20">
                  {onlineVehicles} online
                </Badge>
              </div>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        {/* Fuel Costs */}
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Fuel Costs Today</p>
              <p className="text-3xl font-bold text-foreground mt-1">${fuelCostToday.toFixed(2)}</p>
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-2">
                <TrendingDown className="h-3 w-3" />
                <span>12% savings</span>
              </p>
            </div>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Fuel className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>

        {/* Revenue */}
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Revenue Today</p>
              <p className="text-3xl font-bold text-foreground mt-1">${revenueToday.toFixed(2)}</p>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3" />
                <span>15% increase</span>
              </p>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Vehicle Status Summary & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Vehicle Status Summary */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Vehicle Status Summary
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-green-500/5 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm">Available</span>
              </div>
              <span className="text-lg font-bold text-foreground">{availableVehicles}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-500/5 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2">
                <Route className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm">In Use</span>
              </div>
              <span className="text-lg font-bold text-foreground">{inUseVehicles}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-orange-500/5 rounded-lg border border-orange-500/20">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm">Maintenance</span>
              </div>
              <span className="text-lg font-bold text-foreground">{maintenanceVehicles}</span>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Fleet Efficiency</span>
                <span className="text-sm font-semibold text-foreground">{efficiencyRate}%</span>
              </div>
              <div className="mt-2 w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all" 
                  style={{ width: `${efficiencyRate}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Alerts & Recent Activity */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Alerts & Recent Activity
          </h3>
          
          {/* Alerts Section */}
          <div className="space-y-2 mb-4">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-2 rounded-lg border flex items-start gap-2 ${
                  alert.severity === 'medium' 
                    ? 'bg-yellow-500/5 border-yellow-500/20' 
                    : 'bg-blue-500/5 border-blue-500/20'
                }`}
              >
                <AlertCircle className={`h-4 w-4 mt-0.5 ${
                  alert.severity === 'medium' 
                    ? 'text-yellow-600 dark:text-yellow-400' 
                    : 'text-blue-600 dark:text-blue-400'
                }`} />
                <p className="text-sm text-foreground flex-1">{alert.message}</p>
              </div>
            ))}
          </div>

          {/* Recent Activities */}
          <div className="space-y-2 border-t border-border pt-3">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">RECENT ACTIVITIES</h4>
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-2 text-xs">
                <Clock className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground">{activity.message}</p>
                  <p className="text-muted-foreground">
                    {formatDistanceToNow(activity.time, { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
