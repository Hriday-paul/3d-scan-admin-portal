
import { IAdminStats, IMeta, IMonth, IPet } from "../types";
import baseApi from "./baseApi";

const DashboardApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        adminStats: builder.query<
            {
                message: string; data: {
                    total_registered_user: {
                        count: number,
                        change: number
                    },
                    total_3d_head_scanner: {
                        count: number,
                        change: number
                    },
                }
            },
            {}
        >({
            query: (query) => ({
                url: "/dashboard/stats/",
                params: query
            }),
        }),

        userChart: builder.query<
            { message: string; data: { labels: string[], data: number[] } },
            {}
        >({
            query: (query) => ({
                url: `/dashboard/charts/user-overview/`,
                params: query
            }),
        }),

        scanChart: builder.query<
            { message: string; data: { labels: string[], data: number[] } },
            {}
        >({
            query: (query) => ({
                url: `/dashboard/charts/scanner-overview/`,
                params: query
            }),
        }),


    }),
});

export const { useAdminStatsQuery, useUserChartQuery, useScanChartQuery } = DashboardApi;