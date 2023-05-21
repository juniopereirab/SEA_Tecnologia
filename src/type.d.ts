interface ICompany {
    id: number;
    name: string;
    description: string;
    isRegistrationDone: boolean;
}

type CompanyState = {
    list: ICompany[];
    isLoading: boolean;
    error?: string;
    selectedCompany: number;
};

type RootState = {
    company: CompanyState;
}
