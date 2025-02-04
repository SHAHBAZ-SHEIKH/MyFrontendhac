import { createSlice } from "@reduxjs/toolkit";


const loanRequestSlice = createSlice({
    name: "saveLoanDetails",
    initialState: {
        loanDetails: [],
    },
    reducers: {
        saveLoanDetails: (state, action) => {
            state.loanDetails = action.payload;
        },
    },
})

export const { saveLoanDetails } = loanRequestSlice.actions
export default loanRequestSlice.reducer