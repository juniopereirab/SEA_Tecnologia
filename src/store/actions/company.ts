import { createAsyncThunk } from "@reduxjs/toolkit";

import * as TYPES from "../types";
import dayjs from "dayjs";
import { api } from "../api";
import { AxiosResponse } from "axios";

interface IWorkerFormData {
    id?: number;
    name: string;
    isMale: boolean;
    cpf: string;
    rg: string;
    birthdate: dayjs.Dayjs | null;
    role: number | string;
    activities: ICurrentActivity[],
    documentUrl?: string,
    companyId: number | string,
    isActive: boolean;
}

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

export const createWorker = createAsyncThunk<IWorker, IWorkerFormData>(TYPES.CREATE_WORKER, async (values) => {
    const workerObj = {
        ...values,
        birthdate: values.birthdate?.toISOString(),
        roleId: values.role,
        role: undefined,
        activities: undefined,
    }
    const workerResponse: AxiosResponse<IWorker> = await api.post('/workers', workerObj);
    workerResponse.data.activities = [];
    for (const activity of values.activities) {
        const activityObj = {
            ...activity,
            workerId: workerResponse.data.id,
            companyId: workerResponse.data.companyId,
        }
        const activityResponse: AxiosResponse<IActivitiesWorkers> = await api.post('/activitiesWorkers', activityObj);
        workerResponse.data.activities.push(activityResponse.data);
    }

    return workerResponse.data;
});

export const updateCompany = createAsyncThunk<ICompany, ICompanyUpdate>(TYPES.UPDATE_COMPANY, async (values) => {
    const { id, isRegistrationDone } = values;
    const response: AxiosResponse<ICompany> = await api.put(`/companies/${id}`, { isRegistrationDone });
    return response.data;
});

export const updateWorker = createAsyncThunk<IWorker, IWorkerFormData>(TYPES.UPDATE_WORKER, async (values) => {
    const workerObj = {
        ...values,
        birthdate: values.birthdate?.toISOString(),
        roleId: values.role,
        role: undefined,
        activities: undefined,
        id: undefined,
    };

    const workerResponse: AxiosResponse<IWorker> = await api.put(`/workers/${values.id}`, workerObj);

    workerResponse.data.activities = [];
    for (const activity of values.activities) {
        const id = activity.id;
        delete activity.id;
        if (id) {
            const activityResponse: AxiosResponse<IActivitiesWorkers> = await api.put(`/activitiesWorkers/${id}`, activity);
            workerResponse.data.activities.push(activityResponse.data);
        } else {
            const activityObj = {
                ...activity,
                workerId: workerResponse.data.id,
                companyId: workerResponse.data.companyId,
            }
            const activityResponse: AxiosResponse<IActivitiesWorkers> = await api.post('/activitiesWorkers', activityObj);
            workerResponse.data.activities.push(activityResponse.data);
        }
    }
    return workerResponse.data;
});

export const deleteWorker = createAsyncThunk<void, number>(TYPES.DELETE_WORKER, async (workerId) => {
    await api.delete(`/workers/${workerId}`);
});