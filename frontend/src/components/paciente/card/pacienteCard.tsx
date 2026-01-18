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
    rounded-2xl
    border border-slate-200
    p-4
    flex flex-col justify-between
    cursor-pointer
    bg-white
   hover:border-teal-400
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
    p-2 rounded-full
    hover:bg-slate-100
    transition
  "
      >
        <Pencil className="w-4 h-4  text-slate-500" />
      </button>

      <div>
        <p className="font-semibold text-slate-800 truncate">{nome}</p>
        <p className="text-sm text-slate-500">Idade: {idade} anos</p>
      </div>

      <p className="text-xs text-gray-400 truncate">{maskCPF(cpf)}</p>
    </div>
  );
}
