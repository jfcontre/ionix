import { toast } from "sonner";

/**
 * The Notification instance.
 */
class _NotificationService {

  /**
  * Allows to show notification success 
  * @param message
  * @returns A void
  */
  success(message: string) {
    toast.success(message)
  }

  /**
  * Allows to show notification error 
  * @param message
  * @returns A void
  */
  error(message: string) {
    toast.error(message)
  }
}

export const NotificationService = new _NotificationService();