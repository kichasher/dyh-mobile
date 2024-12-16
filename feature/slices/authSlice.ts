import { authSliceType } from "@/types";
import { getData } from "@/utils/utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState: authSliceType = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        user: { ...action.payload },
      };
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
