import NSButton from "@/components/ui/core/NSButton";
import NSInput from "@/components/ui/core/NSInput";
import { Label } from "@/components/ui/label";
import { useChangePasswordMutation } from "@/redux/api/auth.api";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type FieldType = {
  "current_password": string,
  "new_password": string,
  "confirm_new_password": string
}

const ChangePassForm = () => {

  const [handleChangeByApi, { isLoading, data }] = useChangePasswordMutation();

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPass: false,
  });

  const toggleVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldType>();

  const onSubmit: SubmitHandler<FieldType> = async (data) => {
    try {

      if (data?.new_password !== data?.confirm_new_password) {
        toast.error("New password & confirm password not match");
        return;
      }

      await handleChangeByApi(data).unwrap();
      toast.success("Password updated successfully")

      reset();
      
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong, try again")
    }
  };

  return (
    <>
      <div className=" font-sora max-w-4xl mx-auto w-full">
        <h2 className=" text-center text-2xl font-medium py-2">
          Change Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
          {/* Current Password */}
          <div>
            <div className="relative">
              <Label className="text-lg font-medium text-sc-dark-gray mb-2">
                Current Password
              </Label>

              <NSInput
                type={showPasswords.currentPassword ? "text" : "password"}
                className={`py-6 pr-10 bg-sc-primary/5 ${errors?.current_password && "border-red-500 focus-visible:border-red-500"}`}
                placeholder="Enter your current password"
                {...register("current_password", { required: true })}
              />

              <div
                className="absolute right-3 top-[72%] -translate-y-1/2 cursor-pointer text-sc-clarity-ice"
                onClick={() => toggleVisibility("currentPassword")}
              >
                {showPasswords.currentPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </div>
            </div>
            {errors?.current_password && (
              <span className="text-red-500 text-sm mt-1 block">
                This field is required
              </span>
            )}
          </div>
          {/* New Password */}
          <div>
            <div className="relative">
              <Label className="text-lg font-medium text-sc-dark-gray mb-2">
                New Password
              </Label>
              <NSInput
                type={showPasswords.newPassword ? "text" : "password"}
                className={`py-6 pr-10 bg-sc-primary/5 ${errors?.new_password && "border-red-500 focus-visible:border-red-500"}`}
                placeholder="Enter your new password"
                {...register("new_password", { required: true, pattern: { value: /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/, message: "password minimum 1 Capital, 1 Number, 1 special character total 10 character" } })}
              />
              <div
                className="absolute right-3 top-[72%] -translate-y-1/2 cursor-pointer text-sc-clarity-ice"
                onClick={() => toggleVisibility("newPassword")}
              >
                {showPasswords.newPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </div>
            </div>
            {errors?.new_password && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors?.new_password?.message || "This field is required"}
              </span>
            )}
          </div>
          {/* Confirm New Password */}
          <div>
            <div className="relative">
              <Label className="text-lg font-medium text-sc-dark-gray mb-2">
                Confirm New Password
              </Label>
              <NSInput
                type={showPasswords.confirmNewPass ? "text" : "password"}
                className={`py-6 pr-10 bg-sc-primary/5 ${errors?.confirm_new_password && "border-red-500 focus-visible:border-red-500"}`}
                placeholder="Enter your confirm password"
                {...register("confirm_new_password", { required: true })}
              />

              <div
                className="absolute right-3 top-[72%] -translate-y-1/2 cursor-pointer text-sc-clarity-ice"
                onClick={() => toggleVisibility("confirmNewPass")}
              >
                {showPasswords.confirmNewPass ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </div>
            </div>
            {errors?.confirm_new_password && (
              <span className="text-red-500 text-sm mt-1 block">
                This field is required
              </span>
            )}
          </div>
          <NSButton isLoading={isLoading} disabled={isLoading} type="submit" className="my-6 w-full flex items-center justify-center gap-3 rounded-lg py-3">
            Save Changes <ArrowRight className=" size-6" />
          </NSButton>

        </form>
      </div>
    </>
  );
};

export default ChangePassForm;
