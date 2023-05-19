interface IUser {
    id: number;
    bairro: string;
    cep: string;
    cidade: string;
    complemento: string | number;
    cpf: string | number;
    dt_nascimento: string | number | Date;
    email: string;
    estado: string;
    image: string;
    logradouro: string;
    nome: string;
    senha: string;
    sexo: string;
    sobrenome: string;
    token: string;
}

type UserAction = {
    user: IUser | null;
    isLogged: boolean;
};

type UserState = {
    info: IUser | null;
    isLogged: boolean;
};