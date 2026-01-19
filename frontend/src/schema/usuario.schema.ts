import { validarCpf } from "@/utils/validarCpf";
import { z } from "zod";

export const usuarioSchema = z.object({
    sequsuario: z.number().optional(),

    nomeusuario: z
        .string().min(1, "*Nome é obrigatório"),

    idadeusuario: z
        .string()
        .nonempty("*Idade é obrigatória")
        .transform((idadeusuario) => Number(idadeusuario))
        .refine((idadeusuario) => idadeusuario > 8, {
            message: "*Idade deve ser maior que 8",
        }),

    codusuario: z
        .string().min(1, "*Código é obrigatório")
        .transform((v) => v.toUpperCase()),

    senhausuario: z
        .string().min(8, "*Senha mínimo 8 caracteres"),

    cpfusuario: z.string()
        .min(1, "*CPF é obrigatório")
        .transform((val) => val.replace(/[^\d]+/g, ''))
        .refine(validarCpf, { message: "CPF inválido" }),
});

export type UsuarioFormInput = z.input<typeof usuarioSchema>;
export type UsuarioFormOutput = z.output<typeof usuarioSchema>;