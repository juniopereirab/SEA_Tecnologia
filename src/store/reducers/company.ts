import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { createWorker, deleteWorker, getActivities, getActivitiesWorkers, getCompanies, getEquipments, getRoles, getWorkers, updateCompany, updateWorker } from "../actions/company";

const initialState: CompanyState = {
    isLoading: false,
    selectedCompany: 0,
    error: undefined,
    list: [],
    isRegistrationMode: false,
    selectedWorker: null,
    isDeleteModalOpen: false,
    workerId: null,
    isActiveFilter: false,
};

const companySlicer = createSlice({
    name: 'Company',
    initialState,
    reducers: {
        setSelectedCompany(state, action: PayloadAction<number>) {
            state.selectedCompany = action.payload;
            state.isRegistrationMode = false;
            state.selectedWorker = null;
        },
        setRegistrationMode(state, action: PayloadAction<{isRegistrationMode: boolean; worker: IWorker | null}>) {
            state.isRegistrationMode = action.payload.isRegistrationMode;
            state.selectedWorker = action.payload.worker;
        },
        setDeleteModalOpen(state, action: PayloadAction<{isDeleteModalOpen: boolean, workerId: number | null}>) {
            state.isDeleteModalOpen = action.payload.isDeleteModalOpen;
            state.workerId = action.payload.workerId;
        },
        setIsActiveFilter(state, action: PayloadAction<boolean>) {
            state.isActiveFilter = action.payload;
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
            .addCase(createWorker.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(createWorker.fulfilled, (state, action) => {
                state.isLoading = false;
                const company = state.list[state.selectedCompany];
                const newWorker: IWorker = action.payload;
                newWorker.activities = newWorker.activities.map((activity) => {
                    const activityObj = company.activities.find((act) => act.id === activity.activityId);
                    return {
                        ...activity,
                        name: activityObj ? activityObj.name : "Generico",
                        equipments: company.equipments.filter((equipment) => activity.equipmentsId.includes(equipment.id)),
                    };
                });

                newWorker.role = company.roles.find((role) => role.id === newWorker.roleId)!.name;

                state.list[state.selectedCompany].workers.push(newWorker);
                state.isRegistrationMode = false;
            })
            .addCase(createWorker.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message
            })
            .addCase(updateCompany.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list[state.selectedCompany] = {
                    ...state.list[state.selectedCompany],
                    ...action.payload
                }
            })
            .addCase(updateCompany.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateWorker.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateWorker.fulfilled, (state, action) => {
                state.isLoading = false;
                const company = state.list[state.selectedCompany];
                const workerIndex = company.workers.findIndex((worker) => worker.id === action.payload.id);
                const newWorker: IWorker = action.payload;

                newWorker.activities = newWorker.activities.map((activity) => {
                    const activityObj = company.activities.find((act) => act.id === activity.activityId);
                    return {
                        ...activity,
                        name: activityObj ? activityObj.name : "Generico",
                        equipments: company.equipments.filter((equipment) => activity.equipmentsId.includes(equipment.id)),
                    };
                });

                newWorker.role = company.roles.find((role) => role.id === newWorker.roleId)!.name;
                state.list[state.selectedCompany].workers[workerIndex] = newWorker;
                state.isRegistrationMode = false;
            })
            .addCase(updateWorker.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteWorker.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(deleteWorker.fulfilled, (state) => {
                state.isLoading = false;
                const company = state.list[state.selectedCompany];
                const workerIndex = company.workers.findIndex((worker) => worker.id === state.workerId);

                state.list[state.selectedCompany].workers.splice(workerIndex, 1);
                state.workerId = null;
                state.isDeleteModalOpen = false;
            })
            .addCase(deleteWorker.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export const { setSelectedCompany, setRegistrationMode, setDeleteModalOpen, setIsActiveFilter } = companySlicer.actions;
export default companySlicer.reducer;
