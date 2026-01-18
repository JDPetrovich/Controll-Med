import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateUserForm } from "./createUserForm";
import type { UsuarioFormInput } from "@/schema/usuario.schema";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paciente?: UsuarioFormInput | null;
};

export function CreatePacienteModal({ open, onOpenChange, paciente }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{paciente ? "Editar paciente" : "Novo paciente"}</DialogTitle>
        </DialogHeader>

        <CreateUserForm
          paciente={
            paciente
              ? { ...paciente, idadeusuario: String(paciente.idadeusuario) }
              : undefined
          }
          onSuccess={() => onOpenChange(false)}
        />

      </DialogContent>
    </Dialog>
  );
}
