import NSButton from "@/components/ui/core/NSButton";
import NSInput from "@/components/ui/core/NSInput";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const EditProfileForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
              {...register("name", { required: true })}
            />
            {errors.name && (
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
              {...register("contactNumber", { required: true })}
            />
            {errors.contactNumber && (
              <span className="text-red-500 text-sm mt-1 block">
                This field is required
              </span>
            )}
          </div>
          <NSButton
            type="submit"
            className="my-6 w-full flex items-center justify-center gap-3 rounded-lg py-3"
          >
            Save Changes <ArrowRight className=" size-6" />
          </NSButton>
        </form>
      </div>
    </>
  );
};

export default EditProfileForm;
