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
  } = useForm<UsuarioFormInput>({
    resolver: zodResolver(usuarioSchema) as any, // 👈 IGUAL AO ANTIGO
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

  async function onSubmit(data: UsuarioFormInput) {
    try {
      setLoading(true);

      const validatedData = data as unknown as UsuarioFormOutput;

      console.log("Dados Limpos:", {
        ...validatedData,
        cpfusuario: validatedData.cpfusuario.replace(/\D/g, ""),
      });

      onSuccess?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">

          {/* Nome */}
          <div className="grid gap-1">
            <Label>Nome</Label>
            <Input
              {...register("nomeusuario")}
              placeholder="Informe o Nome"
            />
            {errors.nomeusuario && (
              <p className="text-sm text-red-600">
                {errors.nomeusuario.message}
              </p>
            )}
          </div>

          {/* Idade */}
          <div className="grid gap-1">
            <Label>Idade</Label>
            <Input type="number" min={1}
              {...register("idadeusuario")}
              placeholder="Informe a Idade"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            {errors.idadeusuario && (
              <p className="text-sm text-red-600">
                {errors.idadeusuario.message}
              </p>
            )}
          </div>

          {/* Código */}
          <div className="grid gap-1">
            <Label>Código</Label>
            <Input
              {...register("codusuario")}
              placeholder="Ex: ADM"
            />
            {errors.codusuario && (
              <p className="text-sm text-red-600">
                {errors.codusuario.message}
              </p>
            )}
          </div>

          {/* Senha */}
          <div className="grid gap-1 relative">
            <Label>Senha</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Informe uma Senha"
              className="pr-10"
              {...register("senhausuario")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
            {errors.senhausuario && (
              <p className="text-sm text-red-600">
                {errors.senhausuario.message}
              </p>
            )}
          </div>

          {/* CPF */}
          <div className="grid gap-1 md:col-span-2">
            <Label>CPF</Label>
            <Input
              placeholder="000.000.000-00"
              {...register("cpfusuario")}
              onChange={(e) =>
                setValue("cpfusuario", maskCPF(e.target.value))
              }
            />
            {errors.cpfusuario && (
              <p className="text-sm text-red-600">
                {errors.cpfusuario.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
