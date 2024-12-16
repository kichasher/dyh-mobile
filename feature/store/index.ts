import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/feature/slices/authSlice";
import profileFormSlice from "@/feature/slices/profile-form-slice";
import { authApi } from "../services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { profileApi } from "../services/profileApi";

const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    profileForm: profileFormSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
        authApi.middleware,
        profileApi.middleware
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
setupListeners(store.dispatch);