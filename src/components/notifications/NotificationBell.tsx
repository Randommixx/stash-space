import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { requestNotificationPermission } from '@/lib/notificationSystem';
import { useToast } from '@/hooks/use-toast';

export const NotificationBell: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [notificationCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if ('Notification' in window) {
      setHasPermission(Notification.permission === 'granted');
    }
  }, []);

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setHasPermission(granted);
    
    if (granted) {
      toast({
        title: "Notifications Enabled",
        description: "You'll receive updates about your bookings and invoices.",
      });
    } else {
      toast({
        title: "Notifications Blocked",
        description: "Please enable notifications in your browser settings.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={hasPermission ? undefined : handleEnableNotifications}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {notificationCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {notificationCount}
          </Badge>
        )}
      </Button>
      {!hasPermission && (
        <div className="absolute top-full right-0 mt-2 w-48 text-xs text-muted-foreground bg-background border rounded-md p-2 shadow-lg z-10">
          Click to enable notifications
        </div>
      )}
    </div>
  );
};
