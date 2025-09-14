"use client"
import { Card } from "@/components/ui/card";
import Image from "next/image";
import NSButton from "@/components/ui/core/NSButton";
import s1 from "@/assets/images/s1.png";
import s2 from "@/assets/images/s2.png";
import s3 from "@/assets/images/s3.png";
import s4 from "@/assets/images/s4.png";
import AddNotesModal from "./AddNotesModal";
import { useRescanRequestMutation, useScanDetailsQuery, useUpdateScanStatusMutation } from "@/redux/api/scan.api";
import Loader from "@/utils/Loader";
import ErrorComponent from "@/utils/ErrorComponent";
import moment from "moment";
import { toast } from "sonner";

const scanImages = [s1, s2, s3, s4];
const ScanDetails = ({ id }: { id: string }) => {

  const { isLoading, isError, isSuccess, data } = useScanDetailsQuery({ id });
  const [updateStatusByApi, { isLoading: updateLoad }] = useUpdateScanStatusMutation();
  const [rescanByApi, { isLoading: reScanLoad }] = useRescanRequestMutation();

  const handleUpdateSttatus = async (status: string) => {
    try {
      await updateStatusByApi({ id, status }).unwrap();
      toast.success("Scan status updated successfully")
    }
    catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong, try again")
    }
  }

  const handleRescan = async () => {
    try {
      await rescanByApi({ id }).unwrap();
      toast.success("Re-scan request sent successfully")
    }
    catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong, try again")
    }
  }

  const scanData = {
    Name: "John Doe",
    SubmissionDate: "August 7, 2025",
    HeadWidth: "15.2 cm",
    HeadLength: "19.8 cm",
    EarToEar: "12.4 cm",
    EyeToEye: "6.5 cm",
    Notes: [
      "This scan was taken after a recent haircut.",
      "Please prioritize comfort over thickness.",
      "This is for a teenager.",
    ],
    CustomFit: [
      "Slightly tighter around the back of the head.",
      "Looser fit near ears due to sensitivity.",
      "Include extra padding on the crown.",
    ],
    Status: "Pending",
  };

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorComponent />
  }

  return (
    <Card className="border-[#268CBE] p-4 lg:p-6 w-full bg-[#268CBE]/5">
      <h2 className="text-slate-800 font-semibold text-xl mb-4">
        Scan Details Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {
          // Render scan images
          scanImages.map((image, index: number) => (
            <div
              key={index}
              className=" bg-black rounded-lg flex items-center justify-center"
            >
              <Image
                src={image}
                alt={`Scan Image ${index + 1}`}
                width={250}
                height={250}
                className="rounded-lg object-cover"
              />
            </div>
          ))
        }
      </div>

      {/* Scan Details Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200 bg-white rounded-lg overflow-hidden">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">Name</td>
              <td className="px-4 py-3">{data?.data?.name}</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Submission Date
              </td>
              <td className="px-4 py-3">{moment(data?.data?.submission_date).format("DD-MM-YYYY")}</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Head Width
              </td>
              <td className="px-4 py-3">{scanData.HeadWidth}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">
                Head Length
              </td>
              <td className="px-4 py-3">{scanData.HeadLength}</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Ear-to-Ear
              </td>
              <td className="px-4 py-3">{scanData.EarToEar}</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Eye-to-Eye
              </td>
              <td className="px-4 py-3">{scanData.EyeToEye}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">Notes</td>
              <td className="px-4 py-3">
                <ul className="list-disc list-inside">
                  {scanData.Notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Custom Fit
              </td>
              <td className="px-4 py-3">
                <ul className="list-disc list-inside">
                  {scanData.CustomFit.map((fit, index) => (
                    <li key={index}>{fit}</li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-3 font-medium text-gray-700">Status</td>
              <td className="px-4 py-3">{scanData.Status}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {isSuccess && <div className="w-full flex items-center justify-between gap-4 mt-6">

        <NSButton className=" w-full rounded-lg py-4" isLoading={updateLoad} disabled={updateLoad} onClick={() => handleUpdateSttatus(data?.data?.status == "PROCESSING" ? "COMPLETED" : data?.data?.status == 'COMPLETED' ? "FAILED" : "PROCESSING")}>
          Marks scan as {data?.data?.status == "PROCESSING" ? "Approved" : data?.data?.status == "COMPLETED" ? "Canceled" : "Processing"}
        </NSButton>

        {/* <AddNotesModal> */}
        <NSButton onClick={handleRescan} isLoading={reScanLoad} disabled={reScanLoad} className=" w-full rounded-lg py-4 bg-[#E0EFF5] text-[#268CBE] inset-shadow-sm inset-shadow-indigo-[#E0EFF5]">
          Request Re-Scan
        </NSButton>
        {/* </AddNotesModal> */}
      </div>}
    </Card>
  );
};

export default ScanDetails;
