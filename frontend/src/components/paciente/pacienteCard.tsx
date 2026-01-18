import { maskCPF } from "@/utils/maskCpf";
import { Pencil } from "lucide-react";

type Props = {
  nome: string;
  idade: string;
  cpf: string;
  onClick?: () => void;
  onEdit?: () => void;
};

export function PacienteCard({ nome, idade, cpf, onClick, onEdit }: Props) {
  return (
    <div
      onClick={onClick}
      className="
        w-full h-36
        rounded-xl border
        p-4
        flex flex-col justify-between
        cursor-pointer
        bg-gray-300
        hover:bg-gray-400
        hover:shadow-md
        active:scale-[0.98]
        transition
        relative
      "
    >
      {/* BOTÃO DE EDITAR */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.();
        }}
        className="
          absolute top-2 right-2
          p-1 rounded-md
          hover:bg-black/10
          transition
        "
      >
        <Pencil className="w-5 h-5 text-orange-600" />
      </button>

      <div>
        <p className="font-semibold truncate">{nome}</p>
        <p className="text-sm text-muted-foreground">Idade: {idade} anos</p>
      </div>

      <p className="text-xs text-muted-foreground truncate">{maskCPF(cpf)}</p>
    </div>
  );
}
