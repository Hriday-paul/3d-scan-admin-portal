import { IUser } from "../types";
import baseApi from "./baseApi";

const UsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allusers: builder.query<
            { message: string; data: { count: number, results: IUser[] } },
            {}
        >({
            query: (query) => ({
                url: "/dashboard/users/",
                params: query,
            }),
            providesTags: ["users"],
        }),

        userDetails: builder.query<
            { message: string; data: IUser },
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/dashboard/users/${id}`,
            }),
            providesTags: (_, __, { id }) => [{ type: "user", id }, "users"],
        }),

        block_user: builder.mutation<
            { message: string },
            { id: number }
        >({
            query: ({ id }) => ({
                url: `/dashboard/users/${id}/block/`,
                method: "POST",
            }),
            invalidatesTags: (_, __, { id }) => [{ type: "user", id }, "users"],
        }),

        unblock_user: builder.mutation<
            { message: string },
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/admin/unblock-user/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: (_, __, { id }) => [{ type: "user", id }, "users"],
        }),

        approve_user: builder.mutation<
            { message: string },
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/dashboard/users/${id}/approve/`,
                method: "POST",
            }),
            invalidatesTags: (_, __, { id }) => [{ type: "user", id }, "users"],
        }),




    }),
});

export const { useAllusersQuery, useBlock_userMutation, useUnblock_userMutation, useUserDetailsQuery, useApprove_userMutation } = UsersApi;
