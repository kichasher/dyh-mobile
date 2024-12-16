import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./config";
import customBaseQuery from "./custom-base-query";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: customBaseQuery(API_URL.URL_USER_MANAGEMENT),
  endpoints: (builder) => ({
    updateProfilePicture: builder.mutation({
      query: (credentials) => ({
        url: "/profile/upload-picture",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: credentials,
      }),
    }),
    getCities: builder.query({
      query: () => ({
        url: "/cities",
        method: "GET",
      }),
    }),
    getStates: builder.query({
      query: () => ({
        url: "/states",
        method: "GET",
      }),
    }),
    getCompanyNames: builder.query({
      query: () => ({
        url: "/company-names",
        method: "GET",
      }),
    }),
    getCountries: builder.query({
      query: () => ({
        url: "/countries",
        method: "GET",
      }),
    }),
    getDegreeTypes: builder.query({
      query: () => ({
        url: "/degree-type",
        method: "GET",
      }),
    }),
    getEmployeeTypes: builder.query({
      query: () => ({
        url: "/employee-type",
        method: "GET",
      }),
    }),
    getInstituteNames: builder.query({
      query: () => ({
        url: "/institute-names",
        method: "GET",
      }),
    }),
    getJobTitles: builder.query({
      query: () => ({
        url: "/job-title",
        method: "GET",
      }),
    }),
    getLanguages: builder.query({
      query: () => ({
        url: "/languages",
        method: "GET",
      }),
    }),
    getSkills: builder.query({
      query: (search = "") => ({
        url: "/skills/get-skills",
        method: "GET",
        params: {
          name: search,
        },
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/profile/get-profile",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: "/profile/update-profile",
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetCitiesQuery,
  useGetCompanyNamesQuery,
  useGetCountriesQuery,
  useGetDegreeTypesQuery,
  useGetEmployeeTypesQuery,
  useGetInstituteNamesQuery,
  useGetJobTitlesQuery,
  useGetLanguagesQuery,
  useGetStatesQuery,
  useGetSkillsQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
} = profileApi;
