import { createSlice } from "@reduxjs/toolkit";

import { getCompanies } from "../actions/company";

const initialState: CompanyState = {
    isLoading: false,
    selectedCompany: 0,
    error: undefined,
    list: [],
};

const companySlicer = createSlice({
    name: 'Company',
    initialState,
    reducers: {
        setSelectedCompany(state, action) {
            state.selectedCompany = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompanies.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getCompanies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(getCompanies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export const { setSelectedCompany } = companySlicer.actions;
export default companySlicer.reducer;
