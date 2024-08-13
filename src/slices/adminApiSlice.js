import { apiSliceAdmin } from "./apiSliceAdmin";

export const adminApiSlice = apiSliceAdmin.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `/auth`,
        method: "POST",
        body: data,
      }),
    }),
    getUsers: builder.mutation({
      query: (data) => ({
        url: `/user-list?page=${data.page}&key=${data.key}`,
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/adduser`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/edituser`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `/deleteuser`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetUsersMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminApiSlice;
