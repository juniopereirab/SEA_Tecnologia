import { createAsyncThunk } from "@reduxjs/toolkit";

import * as TYPES from "../types";
import { api } from "../api";

export const getCompanies = createAsyncThunk(TYPES.GET_COMPANIES, async () => {
    const response = await api.get('/companies');
    return response.data;
});
