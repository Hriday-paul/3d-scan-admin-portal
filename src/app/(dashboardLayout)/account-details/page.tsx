import UserManagement from "@/components/modules/account-management/user-management-table";
import NSPageSectionTitle from "@/components/ui/core/NSPageSectionTitle";

const AccountManagement = () => {
  return (
    <>
      <div>
        <NSPageSectionTitle title="Account Details" />
        <UserManagement />
      </div>
    </>
  );
};

export default AccountManagement;
