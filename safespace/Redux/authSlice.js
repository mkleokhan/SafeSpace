import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
    isLandlord: false,
    isTenant: false,
    landlordData: null, // Ensure this is included in the initial state
    errors: {},
  },
  reducers: {
    setToken: (state, action) => {
      console.log("token in reducer", action.payload);
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRole: (state, action) => {
      if (action.payload === "landlord") {
        state.isLandlord = true;
        state.isTenant = false;
      } else if (action.payload === "tenant") {
        state.isLandlord = false;
        state.isTenant = true;
      }
    },
    setLandlordData: (state, action) => {
      state.landlordData = action.payload; // Update the landlordData in the state
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.isLandlord = false;
      state.isTenant = false;
      state.landlordData = null; // Clear landlordData when logging out
      localStorage.removeItem("token");
    },
  },
});

export const {
  setToken,
  setUser,
  setRole,
  setLandlordData,
  setErrors,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;
