import ScanDetails from "@/components/modules/ScanSubmissions/ScanDetails";

const ScanDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <>
      <ScanDetails id={id}/>
    </>
  );
};

export default ScanDetailsPage;
