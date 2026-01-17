import { z } from "zod";

function validarCpf(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++)
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++)
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf.substring(10, 11));
}

export const usuarioSchema = z.object({
    nomeusuario: z.string().min(1, "Nome é obrigatório"),

    idadeusuario: z.coerce
        .number("Idade deve ser um número")
        .int()
        .positive("Idade deve ser maior que 0"),

    codusuario: z.string().min(1, "Código é obrigatório"),

    senhausuario: z.string().min(6, "Senha mínimo 6 caracteres"),

    cpfusuario: z.coerce
        .string()
        .transform((val) => val.replace(/[^\d]+/g, ''))
        .refine(validarCpf, { message: "CPF inválido" }),
});


export type UsuarioInput = z.input<typeof usuarioSchema>;
export type UsuarioOutput = z.output<typeof usuarioSchema>;
