import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { usuarioSchema, type UsuarioInput } from '@/schema/usuario.schema';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { maskCPF } from '@/utils/maskCpf';

type Props = {
  paciente?: UsuarioInput;   
  onSuccess?: () => void;
};

export function CreateUserForm({ paciente, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const form = useForm<UsuarioInput>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nomeusuario: '',
      idadeusuario: '',
      codusuario: '',
      senhausuario: '',
      cpfusuario: '',
    },
  });

  useEffect(() => {
    if (paciente) {
      form.reset({
        ...paciente,
        idadeusuario: String(paciente.idadeusuario),
      });
    } else {
      form.reset({
        nomeusuario: '',
        idadeusuario: '',
        codusuario: '',
        senhausuario: '',
        cpfusuario: '',
      });
    }
  }, [paciente]);

  async function onSubmit(data: UsuarioInput) {
    try {
      setLoading(true);
      console.log('Salvando paciente:', data);
      form.reset();
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        <FormField
          control={form.control}
          name="nomeusuario"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Nome:</FormLabel>
              <FormControl>
                <Input placeholder="Nome do usuário" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idadeusuario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idade:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Idade"
                  value={String(field.value ?? '')}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="codusuario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código:</FormLabel>
              <FormControl>
                <Input placeholder="Código" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="senhausuario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha:</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cpfusuario"
          render={({ field }) => (
            <FormItem >
              <FormLabel>CPF:</FormLabel>
              <FormControl>
                <Input
                  placeholder="000.000.000-00"
                  value={String(field.value ?? '')}
                  onChange={(e) => field.onChange(maskCPF(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="md:col-span-2 py-2">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
