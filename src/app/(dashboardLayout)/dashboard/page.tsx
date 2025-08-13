import RecentAccountList from "@/components/modules/dashboard/recent-account-list";
import RecentTransaction from "@/components/modules/dashboard/recent-transaction";
import TotalStats from "@/components/modules/dashboard/total-stats";
import UserManagementChart from "@/components/modules/dashboard/user-management";

const DashboardPage = () => {
  return (
    <>
      <div className=" space-y-6">
        <TotalStats />
        <div className=" flex flex-col md:flex-row items-center gap-4">
          
        </div>
        <RecentAccountList />
      </div>
    </>
  );
};

export default DashboardPage;
