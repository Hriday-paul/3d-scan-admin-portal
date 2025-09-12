import { IContact, IScan } from "../types";
import baseApi from "./baseApi";

const ContactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        contactList: builder.query<
            { message: string; data: { count: number, results: IContact[] } },
            {}
        >({
            query: (query) => ({
                url: "/dashboard/contacts/",
                params: query,
            }),
            providesTags: ["contacts"],
        }),

        // updateScanStatus: builder.mutation<
        //     { message: string; data: IScan },
        //     { id: string, status: string }
        // >({
        //     query: ({ id, status }) => ({
        //         url: `/dashboard/scans/${id}/`,
        //         method: "PATCH",
        //         body: { status }
        //     }),
        //     invalidatesTags: (_, __, { id }) => [{ type: "scans", id }, "scans"],
        // }),

    })
})

export const { useContactListQuery,  } = ContactApi