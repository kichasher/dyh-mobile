import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from './config';
import customBaseQuery from './custom-base-query';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customBaseQuery(API_URL.URL_USER_MANAGEMENT),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/user/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        signup: builder.mutation({
            query: (credentials) => ({
                url: '/user/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        verify_otp: builder.mutation({
            query: (credentials) => ({
                url: '/user/verify-otp',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation, useVerify_otpMutation } = authApi;