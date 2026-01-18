import { z } from "zod";

export function validarCpf(cpf: string) {
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

    idadeusuario: z.string()
    .min(1, "Idade é obrigatório")
    .transform((v) => Number(v))
    .pipe(z.number().min(0, "Idade deve ser positiva")),

    codusuario: z.string().min(1, "Código é obrigatório"),

    senhausuario: z.string().min(6, "Senha mínimo 6 caracteres"),
    
    cpfusuario: z.string()
        .min(1, "CPF é obrigatório")
        .transform((val) => val.replace(/[^\d]+/g, ''))
        .refine(validarCpf, { message: "CPF inválido" }),
});

export type UsuarioFormInput = z.input<typeof usuarioSchema>;
export type UsuarioFormOutput = z.output<typeof usuarioSchema>;