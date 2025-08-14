import NSButton from "@/components/ui/core/NSButton";
import NSInput from "@/components/ui/core/NSInput";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const ChangePassForm = () => {
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
          Change Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
          {/* Current Password */}
          <div className="relative">
            <Label className="text-lg font-medium text-sc-dark-gray mb-2">
              Current Password
            </Label>
            <NSInput
              type={showPasswords.currentPassword ? "text" : "password"}
              className="py-6 pr-10 bg-sc-primary/5"
              placeholder="Enter your current password"
              {...register("currentPassword", { required: true })}
            />
            {errors.currentPassword && (
              <span className="text-red-500 text-sm mt-1 block">
                This field is required
              </span>
            )}
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
          {/* New Password */}
          <div className="relative">
            <Label className="text-lg font-medium text-sc-dark-gray mb-2">
              New Password
            </Label>
            <NSInput
              type={showPasswords.newPassword ? "text" : "password"}
              className="py-6 pr-10 bg-sc-primary/5"
              placeholder="Enter your new password"
              {...register("newPassword", { required: true })}
            />
            {errors.newPassword && (
              <span className="text-red-500 text-sm mt-1 block">
                This field is required
              </span>
            )}
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
          {/* Confirm New Password */}
          <div className="relative">
            <Label className="text-lg font-medium text-sc-dark-gray mb-2">
              Confirm New Password
            </Label>
            <NSInput
              type={showPasswords.confirmNewPass ? "text" : "password"}
              className="py-6 pr-10 bg-sc-primary/5"
              placeholder="Enter your confirm password"
              {...register("confirmNewPass", { required: true })}
            />
            {errors.confirmNewPass && (
              <span className="text-red-500 text-sm mt-1 block">
                This field is required
              </span>
            )}
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
          <NSButton type="submit" className="my-6 w-full flex items-center justify-center gap-3 rounded-lg py-3">
            Save Changes <ArrowRight className=" size-6" />
          </NSButton>
        </form>
      </div>
    </>
  );
};

export default ChangePassForm;
