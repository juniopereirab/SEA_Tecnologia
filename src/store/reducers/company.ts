import { createSlice } from "@reduxjs/toolkit";

import { getActivities, getActivitiesWorkers, getCompanies, getEquipments, getRoles, getWorkers } from "../actions/company";

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
            .addCase(getWorkers.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getWorkers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list.forEach((company, index) => {
                    state.list[index].workers = action.payload.filter((worker) => worker.companyId === company.id);
                });
            })
            .addCase(getWorkers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getActivities.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getActivities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list.forEach((company, index) => {
                    state.list[index].activities = action.payload.filter((activity) => activity.companyId === company.id);
                });
            })
            .addCase(getActivities.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getEquipments.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getEquipments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list.forEach((company, index) => {
                    state.list[index].equipments = action.payload.filter((equipment) => equipment.companyId === company.id);
                });
            })
            .addCase(getEquipments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getRoles.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getRoles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list.forEach((company, index) => {
                    state.list[index].roles = action.payload.filter((roles) => roles.companyId === company.id);
                });
            })
            .addCase(getRoles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getActivitiesWorkers.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getActivitiesWorkers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list.forEach((company, index) => {
                    company.workers.forEach((worker, workerIndex) => {
                        const activitiesWorker = action.payload;
                        state.list[index].workers[workerIndex].activities = activitiesWorker
                            .filter((activity) => activity.workerId === worker.id)
                            .map((activity) => {
                                return {
                                    ...activity,
                                    equipments: company.equipments.filter((equipment) => activity.equipmentsId.includes(equipment.id)),
                                }
                            });
                    });
                });
            })
            .addCase(getActivitiesWorkers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export const { setSelectedCompany } = companySlicer.actions;
export default companySlicer.reducer;
