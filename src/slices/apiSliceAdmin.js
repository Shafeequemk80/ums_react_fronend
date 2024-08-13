import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL

const baseQuery = fetchBaseQuery({ baseUrl: `${BASE_URL}/api/admin` });

export const apiSliceAdmin = createApi({
  baseQuery,
  tagTypes: ["Admin"],
  endpoints: (builder) => ({}),
});
