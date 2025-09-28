import { IUser } from "../types";
import baseApi from "./baseApi";

const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    verifyOtp: builder.mutation<
      {
        message: string;
        data: { password_change_ticket: string };
      },
      { otp: string }
    >({
      query: ({ otp }) => ({
        url: "/auth/password/reset/verify-otp/",
        method: "POST",
        body: { otp },
      }),
    }),

    resendOtp: builder.mutation<
      { message: string; data: { token: string } },
      { username: string }
    >({
      query: (body) => ({
        url: "/auth/signup/resend-otp",
        method: "POST",
        body
      }),
    }),

    loginUser: builder.mutation<
      {
        message: string;
        data: {
          token: string;
          refresh_token: string;
          user: IUser
        };
      },
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "/auth/login/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    forgotPassword: builder.mutation<
      { message: string; data: { token: string } },
      { email: string }
    >({
      query: (body) => ({
        url: "/auth/password/reset/request-otp/",
        method: "POST",
        body
      }),
    }),

    resetPassword: builder.mutation<
      { message: string },
      { new_password: string; new_password_confirmation: string, password_change_ticket: string }
    >({
      query: (body) => ({
        url: "/auth/password/reset/set-new/",
        method: "POST",
        body: body,
      }),
    }),

    getUserProfile: builder.query<{ message: string; data: { full_name: string, profile_picture: string, email: string, contact_number: string } }, void>({
      query: () => ({
        url: "/dashboard/settings/profile/",
      }),
      providesTags: ["user"],
    }),

    changePassword: builder.mutation<
      { message: string },
      {
        current_password: string;
        new_password: string;
        confirm_new_password: string;
      }
    >({
      query: (data) => ({
        url: "/dashboard/settings/change-password/",
        method: "POST",
        body: data,
      }),
    }),

    updateProfile: builder.mutation<{ message: string }, { data: any }>({
      query: ({ data }) => ({
        url: `/dashboard/settings/profile/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),


  }),
});

export const {
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginUserMutation,
  useResetPasswordMutation,
  useGetUserProfileQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useForgotPasswordMutation,

} = AuthApi;
