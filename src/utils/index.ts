export function formatarCPF(cpf: string): string {
    const cpfFormatado = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cpfFormatado.length !== 11) {
        throw new Error("CPF inválido. O CPF deve conter 11 dígitos.");
    }

    const parte1 = cpfFormatado.slice(0, 3);
    const parte2 = cpfFormatado.slice(3, 6);
    const parte3 = cpfFormatado.slice(6, 9);
    const parte4 = cpfFormatado.slice(9);

    const cpfFormatadoString = `${parte1}.${parte2}.${parte3}-${parte4}`;
    return cpfFormatadoString;
}