import { createAsyncThunk } from "@reduxjs/toolkit";

import * as TYPES from "../types";
import { api } from "../api";

export const getCompanies = createAsyncThunk<ICompany[]>(TYPES.GET_COMPANIES, async () => {
    const response = await api.get('/companies');
    return response.data;
});

export const getWorkers = createAsyncThunk<IWorker[]>(TYPES.GET_WORKERS, async () => {
    const response = await api.get('/workers');
    return response.data;
});

export const getActivities = createAsyncThunk<IActivity[]>(TYPES.GET_ACTIVITIES, async () => {
    const response = await api.get('/activities');
    return response.data;
});

export const getEquipments = createAsyncThunk<IEquipment[]>(TYPES.GET_EQUIPMENTS, async () => {
    const response = await api.get('/equipments');
    return response.data;
});

export const getRoles = createAsyncThunk<IRole[]>(TYPES.GET_ROLES, async () => {
    const response = await api.get('/roles');
    return response.data;
});

export const getActivitiesWorkers = createAsyncThunk<IActivitiesWorkers[]>(TYPES.GET_ACTIVITIES_WORKERS, async () => {
    const response = await api.get('/activitiesWorkers');
    return response.data;
})