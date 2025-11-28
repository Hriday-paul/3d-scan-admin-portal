"use client"
import { Card } from "@/components/ui/card";
import NSButton from "@/components/ui/core/NSButton";
import { useRescanRequestMutation, useScanDetailsQuery, useUpdateScanStatusMutation } from "@/redux/api/scan.api";
import Loader from "@/utils/Loader";
import ErrorComponent from "@/utils/ErrorComponent";
import moment from "moment";
import { toast } from "sonner";
import ObjViewer from "./ObjViewer";
import Link from "next/link";
import { HiOutlineCloudDownload } from "react-icons/hi";

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

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorComponent />
  }

  return (
    <Card className="border-[#268CBE] p-4 lg:p-6 w-full bg-[#268CBE]/5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <h2 className="text-slate-800 font-semibold text-xl mb-4">
          Scan Details Overview
        </h2>

        {data?.data?.reconstructed_3d_head && <Link href={data?.data?.reconstructed_3d_head} download={"scan-model.obj"} className="ml-auto flex flex-row items-center gap-x-1.5 bg-[#268CBE] px-3 py-2 rounded text-white cursor-pointer hover:opacity-80 duration-200">
          <HiOutlineCloudDownload className="size-5 text-white" />
          <p>Download</p>
        </Link>}
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div> */}

      {data?.data?.reconstructed_3d_head && <div >
        <ObjViewer objUrl={data?.data?.reconstructed_3d_head} />
      </div>}

      {/* Scan Details Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200 bg-white rounded-lg overflow-x-auto">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">Name</td>
              <td className="px-4 py-3">{data?.data?.name}</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Submission Date
              </td>
              <td className="px-4 py-3">{moment(data?.data?.submission_date).format("DD-MM-YYYY h:mm a")}</td>
              {/* <td className="px-4 py-3 font-medium text-gray-700">
                Head Width
              </td>
              <td className="px-4 py-3">{data?.data?.head_width || 0} cm</td> */}
            </tr>

            {/* <tr className="border-b border-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">
                Head Length
              </td>
              <td className="px-4 py-3">{data?.data?.head_length || 0} cm</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Ear-to-Ear
              </td>
              <td className="px-4 py-3">{data?.data?.ear_to_ear || 0} cm</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Eye-to-Eye
              </td>
              <td className="px-4 py-3">{data?.data?.eye_to_eye || 0} cm</td>
            </tr> */}

            <tr className="border-b border-gray-200">
              {/* <td className="px-4 py-3 font-medium text-gray-700">
               Head Height
              </td> */}
              {/* <td className="px-4 py-3">{data?.data?.head_height || 0} cm</td> */}
              <td className="px-4 py-3 font-medium text-gray-700">
                Head Circumference (A)
              </td>
              <td className="px-4 py-3">{data?.data?.head_circumference_A || 0} cm</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Forehead to Back (B)
              </td>
              <td className="px-4 py-3">{data?.data?.forehead_to_back_B || 0} cm</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">
                Cross Measurement (C)
              </td>
              <td className="px-4 py-3">{data?.data?.cross_measurement_C || 0} cm</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Under Chin (D)
              </td>
              <td className="px-4 py-3">{data?.data?.under_chin_D || 0} cm</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Eyebrow to Earlobe (E)
              </td>
              <td className="px-4 py-3">{data?.data?.eyebrow_to_earlobe_E || 0} cm</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">
                Eye corner to Ear (F)
              </td>
              <td className="px-4 py-3">{data?.data?.eye_corner_to_ear_F || 0} cm</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Ear Height (G)
              </td>
              <td className="px-4 py-3">{data?.data?.ear_height_G || 0} cm</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Ear Width (H)
              </td>
              <td className="px-4 py-3">{data?.data?.ear_width_H || 0} cm</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">
                Cheek guard clearance (L)
              </td>
              <td className="px-4 py-3">{data?.data?.cheek_guard_clearance_L || 0} cm</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Cheek Guard Height (M)
              </td>
              <td className="px-4 py-3">{data?.data?.cheek_guard_height_M || 0} cm</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Cheek Guard Width (N)
              </td>
              <td className="px-4 py-3">{data?.data?.cheek_guard_width_N || 0} cm</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">Notes</td>
              <td className="px-4 py-3">
                {data?.data?.notes}
              </td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Custom Fit
              </td>
              <td className="px-4 py-3">
                {data?.data?.custom_field}
              </td>
              <td className="px-4 py-3 font-medium text-gray-700">Status</td>
              <td className="px-4 py-3">{data?.data?.status}</td>
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
