import PushNotifications from "@/components/modules/PushNotification";
import NSPageSectionTitle from "@/components/ui/core/NSPageSectionTitle";

const PushNotificationsPage = () => {
  return (
    <>
      <NSPageSectionTitle title="Send Notification" />
      <PushNotifications />
    </>
  );
};

export default PushNotificationsPage;
