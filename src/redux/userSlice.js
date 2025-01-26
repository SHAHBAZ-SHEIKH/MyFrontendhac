import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers:{
        //Login 
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
        signupStart: (state) => {
            state.isFetching = true;
          },
          signupSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
          },
          signupFailure: (state) => {
            state.isFetching = false;
            state.error = true;
          },
          logout: (state) => {
            state.currentUser = null;
          },
    }
});

export const { loginStart, loginSuccess, loginFailure ,signupStart, signupSuccess, signupFailure, logout} = userSlice.actions;
export default userSlice.reducer;