import { createSlice } from "@reduxjs/toolkit";


const loanRequestFromSlice = createSlice({
    name: "loanRequestForm",
    initialState: {
        loanRequestForm: [],
    },
    reducers: {
        saveLoanRequestForm: (state, action) => {
            console.log(action.payload);
            const { loan} = action.payload;

    state.loanRequestForm =  [...state.loanRequestForm, { loan}];
        }
    }
})

export const { saveLoanRequestForm } = loanRequestFromSlice.actions
export default loanRequestFromSlice.reducer