import { useState } from 'react';
import { Bell, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: number;
  type: 'alert' | 'info' | 'trip' | 'status';
  message: string;
  time: Date;
  severity?: 'low' | 'medium' | 'high';
  read?: boolean;
}

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
      id: 1, 
      type: 'alert', 
      message: '3 vehicles due for maintenance', 
      time: new Date(Date.now() - 10 * 60000),
      severity: 'medium',
      read: false
    },
    { 
      id: 2, 
      type: 'trip', 
      message: 'Vehicle FL-001 completed delivery route', 
      time: new Date(Date.now() - 15 * 60000),
      severity: 'low',
      read: false
    },
    { 
      id: 3, 
      type: 'alert', 
      message: 'Vehicle FL-003 requires maintenance check', 
      time: new Date(Date.now() - 25 * 60000),
      severity: 'medium',
      read: false
    },
    { 
      id: 4, 
      type: 'status', 
      message: 'Vehicle FL-007 went online', 
      time: new Date(Date.now() - 35 * 60000),
      severity: 'low',
      read: true
    },
    { 
      id: 5, 
      type: 'trip', 
      message: 'Vehicle FL-002 started new trip to Brooklyn', 
      time: new Date(Date.now() - 45 * 60000),
      severity: 'low',
      read: true
    },
    { 
      id: 6, 
      type: 'info', 
      message: 'All drivers have completed safety training', 
      time: new Date(Date.now() - 60 * 60000),
      severity: 'low',
      read: true
    },
    { 
      id: 7, 
      type: 'alert', 
      message: 'Fuel costs exceeded budget by 5%', 
      time: new Date(Date.now() - 120 * 60000),
      severity: 'high',
      read: true
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string, severity?: string) => {
    if (type === 'alert' && severity === 'high') {
      return <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
    }
    if (type === 'alert' && severity === 'medium') {
      return <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
    }
    if (type === 'status' || type === 'info') {
      return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
    }
    return <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs text-primary hover:text-primary"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mb-2 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 transition-colors hover:bg-accent/50 ${
                    !notification.read ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getIcon(notification.type, notification.severity)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(notification.time, { addSuffix: true })}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearNotification(notification.id);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
