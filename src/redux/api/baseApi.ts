
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cookies } from "react-cookie";
import { INotification } from '../types';
import { config } from '@/utils/config';

const cookies = new Cookies();

const baseQuery = fetchBaseQuery({
    baseUrl: config.clientBaseApi,
    // credentials: "include",
    prepareHeaders: (headers, { endpoint }) => {

        const authEndpoints = ['loginUser', 'verifyOtp', 'createAccount', "resendOtp", "forgotPassword", "resetPassword"];

        if (authEndpoints.includes(endpoint)) {
            const token = cookies.get("token");
            if (token) {
                headers.set("Authorization", `${token}`);
            }
        } else {
            const accessToken = cookies.get("accessToken");
            if (accessToken) {
                headers.set("Authorization", `Bearer ${accessToken}`);
            }
        }

        return headers;
    },
});

// Refresh the base----------------------------------------------------------------
const baseQueryWithReauth: typeof baseQuery = async (
    args,
    api,
    extraOptions,
) => {

    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {

        const refreshToken = cookies.get("refreshToken");

        if (refreshToken) {

            const refreshResult = await baseQuery(
                {
                    url: "/auth/login/refresh/",
                    method: "POST",
                    // headers: {
                    //     token: refreshToken
                    // },
                    body: { refresh: refreshToken },
                },
                api,
                extraOptions,
            ) as { data: { data: { access: string } } };

            // Check if refreshResult contains data and accessToken
            if (refreshResult?.data && refreshResult?.data?.data?.access) {

                const newAccessToken = refreshResult?.data?.data?.access;

                // Save the new token
                cookies.set("accessToken", newAccessToken, {
                    httpOnly: false,
                    maxAge: 14 * 24 * 60 * 60, // 14 days
                    path: '/',
                    sameSite: 'lax',
                    secure: config.hasSSL,
                });

                // Retry the original request with the new token
                api.dispatch({
                    type: "auth/tokenRefreshed",
                    payload: newAccessToken,
                });
                result = await baseQuery(args, api, extraOptions);
            } else {
                // Logout user if refresh token fails
                api.dispatch({ type: "user/removeUser" });
            }
        } else {
            api.dispatch({ type: "user/removeUser" });
            // api.dispatch(removeUser());
        }
    }

    return result;
};


const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['user', "users", "privacy", "terms", "about", "earning", "notification", "scans", "contacts", "push_notifications"],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        notifications: builder.query<{ data: {count : number, results : INotification[]} }, {}>({
            query: (query) => ({
                url: '/dashboard/admin-notifications/',
                params: query
            }),
            providesTags : ["notification"]
        }),
        deleteNotifications: builder.mutation<{ data: {data : INotification[]} }, {id : string}>({
            query: ({id}) => ({
                url: `/notifications/delete-notification/${id}`,
                method : "DELETE"
            }),
            invalidatesTags : ["notification"]
        }),
        markReadAllNotification: builder.mutation<{ message : string }, void>({
            query: () => ({
                url: `/dashboard/admin-notifications/mark-as-read/`,
                method : "POST"
            }),
            invalidatesTags : ["notification"]
        }),

    })
});

export const {useNotificationsQuery, useDeleteNotificationsMutation, useMarkReadAllNotificationMutation } = baseApi;
export default baseApi;