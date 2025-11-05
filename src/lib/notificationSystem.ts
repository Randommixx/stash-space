export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const sendBrowserNotification = (title: string, options?: NotificationOptions) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/favicon.ico',
      ...options,
    });
  }
};

export const notifyBookingAccepted = (equipmentName: string, invoiceRef: string) => {
  sendBrowserNotification('Booking Accepted! 🎉', {
    body: `Your booking for ${equipmentName} has been confirmed.\nInvoice: ${invoiceRef}`,
    tag: 'booking-accepted',
  });
};

export const notifyBookingRejected = (equipmentName: string) => {
  sendBrowserNotification('Booking Update', {
    body: `Your booking for ${equipmentName} was not accepted by the vendor.`,
    tag: 'booking-rejected',
  });
};

export const notifyInvoiceGenerated = (invoiceRef: string) => {
  sendBrowserNotification('Invoice Generated 📄', {
    body: `New invoice ${invoiceRef} is ready for download.`,
    tag: 'invoice-generated',
  });
};
