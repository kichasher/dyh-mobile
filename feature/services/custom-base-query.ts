import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { getData } from "@/utils/utils";

interface UserInfo {
  access_token?: string;
}

interface CustomError {
  status: number;
  data: string;
}

type CustomBaseQueryFn = BaseQueryFn<
  {
    url: string;
    method?: string;
    body?: unknown;
    params?: Record<string, string>;
    headers?: Record<string, string>;
  },
  unknown,
  CustomError
>;

// Custom base query with type safety
const customBaseQuery = (baseUrl: string): CustomBaseQueryFn => {
  const baseQuery = fetchBaseQuery({ baseUrl });

  return async (args, api, extraOptions) => {
    console.log(
      "🚀 ~ return ~ args, api, extraOptions:",
      JSON.stringify({ args, api, extraOptions }, null, 2)
    );

    try {
      const userInfo: UserInfo | null = await getData("userInfo");
      const accessToken = userInfo?.access_token;

      if (accessToken) {
        args.headers = {
          ...args.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }

      // Make the API request
      const result = await baseQuery(args, api, extraOptions);

      // Type guard for Blob responses
      if (result.data instanceof Blob) {
        return { data: result.data };
      }

      // Type guard for non-JSON responses
      if (
        result.data &&
        typeof result.data === "object" &&
        "type" in result.data &&
        result.data.type !== "application/json"
      ) {
        return { data: result.data };
      }

      // Handle unauthorized errors
      if (result.error && "status" in result.error && result.error.status === 401) {
        return {
          error: {
            status: 401,
            data: "Unauthorized",
          },
        };
      }

      return result;
    } catch (error) {
      // Handle any unexpected errors
      return {
        error: {
          status: 500,
          data: "Internal error occurred",
        },
      };
    }
  };
};

export default customBaseQuery;