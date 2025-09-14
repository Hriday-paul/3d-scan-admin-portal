import { IScan } from "../types";
import baseApi from "./baseApi";

const ScanApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allScans: builder.query<
            { message: string; data: { count: number, results: IScan[] } },
            {}
        >({
            query: (query) => ({
                url: "/dashboard/scans/",
                params: query,
            }),
            providesTags: ["scans"],
        }),
        scanDetails: builder.query<
            { message: string; data: IScan },
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/dashboard/scans/${id}/`,
            }),
            providesTags: (_, __, { id }) => [{ type: "scans", id }, "scans"],
        }),
        updateScanStatus: builder.mutation<
            { message: string; data: IScan },
            { id: string, status: string }
        >({
            query: ({ id, status }) => ({
                url: `/dashboard/scans/${id}/`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: (_, __, { id }) => [{ type: "scans", id }, "scans"],
        }),

        RescanRequest: builder.mutation<
            { message: string; data: IScan },
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/dashboard/scans/${id}/rescan/`,
                method: "POST",
                // body: { status }
            }),
            invalidatesTags: (_, __, { id }) => [{ type: "scans", id }, "scans"],
        }),

    })
})

export const { useAllScansQuery, useScanDetailsQuery, useUpdateScanStatusMutation, useRescanRequestMutation } = ScanApi