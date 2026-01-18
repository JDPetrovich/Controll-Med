import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

import { maskCPF } from "@/utils/maskCpf";
import {
  usuarioSchema,
  type UsuarioFormInput,
  type UsuarioFormOutput,
} from "@/schema/usuario.schema";

type Props = {
  paciente?: UsuarioFormInput;
  onSuccess?: () => void;
};

export function CreateUserForm({ paciente, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UsuarioFormInput, any, UsuarioFormOutput>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nomeusuario: "",
      idadeusuario: "",
      codusuario: "",
      senhausuario: "",
      cpfusuario: "",
    },
  });

  useEffect(() => {
    if (paciente) {
      reset({
        ...paciente,
        cpfusuario: maskCPF(paciente.cpfusuario ?? ""),
      });
    }
  }, [paciente, reset]);

  async function onSubmit(data: UsuarioFormOutput) {
    try {
      setLoading(true);

      const payload: UsuarioFormOutput = {
        ...data,
        cpfusuario: data.cpfusuario.replace(/\D/g, ""),
      };

      console.log("Enviando para IPC:", payload);

      await window.ipc.criarUsuario(payload);

      onSuccess?.();
      reset();
    } catch(error){
      console.error("Erro ao criar usuário:", error);
    }finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">

          {/* Nome */}
          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="nomeusuario">Nome</Label>
              <span
                id="nomeusuario-error"
                className="text-xs text-red-600 min-h-4"
              >
                {errors.nomeusuario?.message ?? ""}
              </span>
            </div>

            <Input
              id="nomeusuario"
              {...register("nomeusuario")}
              placeholder="Informe o Nome"
              aria-invalid={!!errors.nomeusuario}
              aria-describedby="nomeusuario-error"
            />
          </div>

          {/* Idade */}
          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="idadeusuario">Idade</Label>
              <span
                id="idadeusuario-error"
                className="text-xs text-red-600 min-h-4"
              >
                {errors.idadeusuario?.message ?? ""}
              </span>
            </div>

            <Input
              id="idadeusuario"
              type="number"
              min={1}
              {...register("idadeusuario")}
              placeholder="Informe a Idade"
              aria-invalid={!!errors.idadeusuario}
              aria-describedby="idadeusuario-error"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Código */}
          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="codusuario">Código</Label>
              <span
                id="codusuario-error"
                className="text-xs text-red-600 min-h-4"
              >
                {errors.codusuario?.message ?? ""}
              </span>
            </div>

            <Input
              id="codusuario"
              {...register("codusuario", {
                onChange: (e) => {
                  e.target.value = e.target.value.toUpperCase();
                }
              })}
              placeholder="Ex: ADM"
              aria-invalid={!!errors.codusuario}
              aria-describedby="codusuario-error"
            />
          </div>

          {/* Senha */}
          <div className="grid gap-1 relative">
            <div className="flex items-center justify-between">
              <Label htmlFor="senhausuario">Senha</Label>
              <span
                id="senhausuario-error"
                className="text-xs text-red-600 min-h-4"
              >
                {errors.senhausuario?.message ?? ""}
              </span>
            </div>

            <Input
              id="senhausuario"
              type={showPassword ? "text" : "password"}
              placeholder="Informe uma Senha"
              className="pr-10"
              {...register("senhausuario")}
              aria-invalid={!!errors.senhausuario}
              aria-describedby="senhausuario-error"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* CPF */}
          <div className="grid gap-1 md:col-span-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="cpfusuario">CPF</Label>
              <span
                id="cpfusuario-error"
                className="text-xs text-red-600 min-h-4"
              >
                {errors.cpfusuario?.message ?? ""}
              </span>
            </div>

            <Input
              id="cpfusuario"
              placeholder="000.000.000-00"
              {...register("cpfusuario")}
              onChange={(e) =>
                setValue("cpfusuario", maskCPF(e.target.value))
              }
              aria-invalid={!!errors.cpfusuario}
              aria-describedby="cpfusuario-error"
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
