interface IRole {
    id: number;
    name: string;
    companyId: number;
}

interface IActivity {
    id: number;
    name: string;
    companyId: number;
}

interface IEquipment {
    id: number;
    name: string;
    numberCA: string;
    companyId: number;
}

interface IActivitiesWorkers {
    id: number;
    activityId: number;
    equipmentsId: number[];
    workerId: number;
    companyId: number;
    equipments: IEquipments[];
    name: string;
}

interface IWorker {
    id: number;
    name: string;
    isMale: boolean;
    birthdate: Date | string;
    cpf: string;
    rg: string;
    documentUrl?: string;
    roleId: number;
    role: string;
    companyId: number;
    activities: IActivitiesWorkers[];
    isActive: boolean;
}

interface ICompany {
    id: number;
    name: string;
    description: string;
    isRegistrationDone: boolean;
    roles: IRole[];
    workers: IWorker[];
    activities: IActivity[];
    equipments: IEquipment[];
}

type CompanyState = {
    list: ICompany[];
    isLoading: boolean;
    error?: string;
    selectedCompany: number;
    isRegistrationMode: boolean;
    isDeleteModalOpen: boolean;
};

type RootState = {
    company: CompanyState;
}
