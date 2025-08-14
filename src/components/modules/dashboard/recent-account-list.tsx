import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Single user object
const user = {
  name: "Eleanor Pena",
  role: "Private User",
  dateBirth: "12-03-2001",
  numberScan: 5,
  status: "Pending",
  joinDate: "11 Feb, 2025",
};

// Generate 10 users with unique serial numbers
const data = Array.from({ length: 10 }, (_, i) => ({
  serial: i + 1,
  ...user,
}));

const RecentAccountList = () => {
  return (
    <Card className="overflow-x-auto p-0 border-none shadow-none rounded-none">
      {/* Table */}
      <table className="min-w-full table-auto text-left text-sm">
        <thead className="bg-[#268CBE] text-white">
          <tr>
            <th className="px-4 py-4 text-center">Serial</th>
            <th className="px-4 py-4 text-center">Name</th>
            <th className="px-4 py-4 text-center">Role</th>
            <th className="px-4 py-4 text-center">Date of Birth</th>
            <th className="px-4 py-4 text-center">Number of Scan</th>
            <th className="px-4 py-4 text-center">Status</th>
            <th className="px-4 py-4 text-center">Joined Date</th>
            <th className="px-4 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user) => (
            <tr
              key={user.serial}
              className="border-b hover:bg-[#268CBE]/10 text-gray-800"
            >
              <td className="px-4 py-2 text-center">{user.serial}</td>

              <td className="flex items-center justify-center gap-2 px-4 py-2">
                {user.name}
              </td>

              <td className="px-4 py-2 text-center">{user.role}</td>
              <td className="px-4 py-2 text-center">{user.dateBirth}</td>
              <td className="px-4 py-2 text-center">{user.numberScan}</td>

              <td
                className={cn(
                  "px-4 py-2 text-center font-medium",
                  user.status === "Pending"
                    ? "text-yellow-600"
                    : user.status === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                )}
              >
                {user.status}
              </td>

              <td className="px-4 py-2 text-center">{user.joinDate}</td>

              <td className="px-4 py-2 text-center">
                <Button size="sm" variant="outline">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default RecentAccountList;
