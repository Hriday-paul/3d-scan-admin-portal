import SettingsSections from "@/components/modules/settings";
import NSPageSectionTitle from "@/components/ui/core/NSPageSectionTitle";

const SettingsPage = () => {
  return (
    <>
      <NSPageSectionTitle title="Settings" />
      <div>
        <SettingsSections />
      </div>
    </>
  );
};

export default SettingsPage;
