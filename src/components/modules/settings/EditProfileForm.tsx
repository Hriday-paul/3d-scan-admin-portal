import NSButton from "@/components/ui/core/NSButton";
import NSInput from "@/components/ui/core/NSInput";
import { Label } from "@/components/ui/label";
import { useUpdateProfileMutation } from "@/redux/api/auth.api";
import { ArrowRight } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type FieldType = {
  full_name: string,
  email: string,
  contact_number: string,
}

const EditProfileForm = ({ defaultData, image }: { defaultData: { full_name: string, contact_number: string, email: string }, image: null | File }) => {

  const [handleupdate, { isLoading }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldType>({
    defaultValues: defaultData
  });


  const onSubmit: SubmitHandler<FieldType> = async (data) => {
    try {
      const form = new FormData();
      form.append("full_name", data?.full_name);
      form.append("contact_number", data?.contact_number);

      if (image) {
        form.append("profile_picture", image)
      }
      await handleupdate({ data: form }).unwrap();
      toast.success("Profile updated successfully");

    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong, try again")
    }
  };

  return (
    <>
      <div className=" font-sora max-w-4xl mx-auto w-full">
        <h2 className=" text-center text-2xl font-medium py-2">
          Edit Your Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
          <div className="relative">
            <Label className="text-lg font-medium text-sc-dark-gray mb-2">
              Name
            </Label>
            <NSInput
              type="text"
              className="py-6 pr-10 bg-sc-primary/5"
              placeholder="Enter your full name"
              {...register("full_name", { required: true })}
            />
            {errors.full_name && (
              <span className="text-red-500 text-sm mt-1 block">
                This field is required
              </span>
            )}
          </div>
          <div className="relative">
            <Label className="text-lg font-medium text-sc-dark-gray mb-2">
              Email address
            </Label>
            <NSInput
              disabled
              type="text"
              className="py-6 pr-10 bg-sc-primary/5"
              placeholder="Enter your email address"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1 block">
                This field is required
              </span>
            )}
          </div>
          <div className="relative">
            <Label className="text-lg font-medium text-sc-dark-gray mb-2">
              Contact Number
            </Label>
            <NSInput
              type="text"
              className="py-6 pr-10 bg-sc-primary/5"
              placeholder="Enter your contact number"
              {...register("contact_number", { required: true })}
            />
            {errors.contact_number && (
              <span className="text-red-500 text-sm mt-1 block">
                This field is required
              </span>
            )}
          </div>
          <NSButton
            type="submit"
            className="my-6 w-full flex items-center justify-center gap-3 rounded-lg py-3"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Save Changes <ArrowRight className=" size-6" />
          </NSButton>
        </form>
      </div>
    </>
  );
};

export default EditProfileForm;
