export function formatarCPF(cpf: string): string {
    const cpfFormatado = cpf.replace(/\D/g, "");

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

export function formatRG(rg: string): string {
    const cleanRG = rg.replace(/\D/g, '');
  
    if (cleanRG.length !== 7) {
      return rg;
    }
  
    // Formata o RG no padrão XX.XXX.X-X
    const formattedRG = `${cleanRG.slice(0, 2)}.${cleanRG.slice(2, 5)}.${cleanRG.slice(5, 6)}-${cleanRG.slice(6)}`;
  
    return formattedRG;
}