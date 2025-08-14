import HeadScannerOverview from "@/components/modules/dashboard/HeadScannerOverview";
import RecentAccountList from "@/components/modules/dashboard/recent-account-list";
import TotalStats from "@/components/modules/dashboard/total-stats";
import UserManagementChart from "@/components/modules/dashboard/user-management";

const DashboardPage = () => {
  return (
    <>
      <div className=" space-y-6">
        <TotalStats />
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="">
            <UserManagementChart />
          </div>
          <div className="">
            <HeadScannerOverview />
          </div>
        </div>
        <RecentAccountList />
      </div>
    </>
  );
};

export default DashboardPage;
