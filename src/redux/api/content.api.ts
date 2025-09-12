import baseApi from "./baseApi";

const contentApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    getPrivacyContents: builder.query<{ data: { title: string, content: string } }, void>({
      query: () => ({
        url: `/dashboard/content/privacy-policy/`,
        method: "GET"
      }),
      providesTags: ['privacy'],
    }),

    updatePrivacyContent: builder.mutation<{ message: string }, string>({
      query: (data) => ({
        url: `/dashboard/content/privacy-policy/`,
        method: "PUT",
        body: {
          "content": data,
          title : "privacy-policy"
        },
      }),
      invalidatesTags: ["privacy"],
    }),


    getAboutContents: builder.query<{ data: { title: string, description: string } }, void>({
      query: () => ({
        url: `/admin/get-about`,
        method: "GET"
      }),
      providesTags: ["about"],
    }),

    updateAboutContent: builder.mutation<{ message: string }, string>({
      query: (data) => ({
        url: `/admin/update-about`,
        method: "PATCH",
        body: {
          "description": data
        },
      }),
      invalidatesTags: ["about"],
    }),

    getTermsContents: builder.query<{ data: { title: string, content: string } }, void>({
      query: () => ({
        url: `/dashboard/content/terms-and-conditions/`,
        method: "GET"
      }),
      providesTags: ["terms"],
    }),

    updateTermsContent: builder.mutation<{ message: string }, string>({
      query: (data) => ({
        url: `/dashboard/content/terms-and-conditions/`,
        method: "PUT",
        body: {
          "content": data,
          title : "terms-and-conditions"
        },
      }),
      invalidatesTags: ['terms'],
    }),

  }),
});

export const { useGetPrivacyContentsQuery, useUpdatePrivacyContentMutation, useGetAboutContentsQuery, useUpdateAboutContentMutation, useGetTermsContentsQuery, useUpdateTermsContentMutation } = contentApi;
