import { IKeenToolsQuota, IResetKeenToolsQuotaPayload, IResetKeenToolsQuotaResponse, IScan } from "../types";
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

        getKeenToolsQuota: builder.query<IKeenToolsQuota, void>({
            query: () => ({
                url: "/dashboard/keentools-quota/",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                if (response?.data && typeof response.data === "object" && "max_scans" in response.data) {
                    return response.data as IKeenToolsQuota;
                }
                return response as IKeenToolsQuota;
            },
            providesTags: ["keentools_quota"],
        }),

        resetKeenToolsQuota: builder.mutation<
            IResetKeenToolsQuotaResponse,
            IResetKeenToolsQuotaPayload
        >({
            query: (body) => ({
                url: "/dashboard/keentools-quota/reset/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["keentools_quota"],
        }),

    })
})

export const {
    useAllScansQuery,
    useScanDetailsQuery,
    useUpdateScanStatusMutation,
    useRescanRequestMutation,
    useGetKeenToolsQuotaQuery,
    useResetKeenToolsQuotaMutation,
} = ScanApi;