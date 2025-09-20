import { IPush_notification } from "../types";
import baseApi from "./baseApi";

const PushNotificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        PushNotificationList: builder.query<
            { message: string; data: { count: number, results: IPush_notification[] } },
            {}
        >({
            query: (query) => ({
                url: "/dashboard/push-notifications-history/",
                params: query,
            }),
            providesTags: ["push_notifications"],
        }),

        sendPushNotification: builder.mutation<
            { message: string },
            { title: string, message: string }
        >({
            query: (body) => ({
                url: `/dashboard/push-notifications/send/`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ["push_notifications"],
        }),

    })
})

export const { usePushNotificationListQuery, useSendPushNotificationMutation } = PushNotificationApi;