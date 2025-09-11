import UserDetails from "@/components/modules/User/UserDetails";

const UserDetailsPage = async({ params }: { params: Promise<{ id: string }> }) => {
  const {id} = await params;

  return (
    <>
      <UserDetails id={id}/>
    </>
  );
};

export default UserDetailsPage;
