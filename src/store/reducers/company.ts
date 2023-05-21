import { createSlice } from "@reduxjs/toolkit";

import { getActivities, getActivitiesWorkers, getCompanies, getEquipments, getRoles, getWorkers } from "../actions/company";

const initialState: CompanyState = {
    isLoading: false,
    selectedCompany: 0,
    error: undefined,
    list: [],
    isRegistrationMode: false,
    isDeleteModalOpen: false,
};

const companySlicer = createSlice({
    name: 'Company',
    initialState,
    reducers: {
        setSelectedCompany(state, action) {
            state.selectedCompany = action.payload;
        },
        setRegistrationMode(state, action) {
            state.isRegistrationMode = action.payload;
        },
        setDeleteModalOpen(state, action) {
            state.isDeleteModalOpen = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompanies.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getCompanies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload.map((company) => {
                    return {
                        ...company,
                        workers: [],
                        roles: [],
                        activities: [],
                        equipments: [],
                    };
                });
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
                    state.list[index].workers = action.payload
                        .filter((worker) => worker.companyId === company.id)
                        .map((worker) => {
                            return {
                                ...worker,
                                activities: [],
                                role: "",
                            }
                        });
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

                state.list.forEach((company, index) => {
                    state.list[index].workers.forEach((worker, workerIndex) => {
                        state.list[index].workers[workerIndex].role = company.roles.find((role) => role.id === worker.roleId)!.name;
                    })
                })
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
                                const activityObj = company.activities.find((act) => act.id === activity.activityId);
                                return {
                                    ...activity,
                                    name: activityObj ? activityObj.name : "Generico",
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

export const { setSelectedCompany, setRegistrationMode, setDeleteModalOpen } = companySlicer.actions;
export default companySlicer.reducer;
