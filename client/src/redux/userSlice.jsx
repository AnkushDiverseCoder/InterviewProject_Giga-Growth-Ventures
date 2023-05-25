import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({

// Unique identifier
  name: "user",

// Initial state
  initialState,

// Reducers
  reducers: {
  
    loginStart: (state) => {
      state.loading = true;
    },
    
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;