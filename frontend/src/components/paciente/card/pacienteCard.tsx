import { maskCPF } from "@/utils/maskCpf";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  nome: string;
  idade: string;
  cpf: string;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function PacienteCard({ nome, idade, cpf, onClick, onEdit, onDelete }: Props) {
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
      <div className="flex-row justify-end absolute top-2 right-2 flex gap-2">
        {/* BOTÃO DE EDITAR */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="p-2 rounded-full hover:bg-slate-100 transition "
        >
          <Pencil className="w-4 h-4  text-slate-500" />
        </button>

        {/* BOTÃO DE EXCLUIR   */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="p-2 rounded-full hover:bg-slate-100 transition "
        >
          <Trash2 className="w-4 h-4  text-red-500" />
        </button>
      </div>

      <div>
        <p className="font-semibold text-slate-800 truncate">{nome}</p>
        <p className="text-sm text-slate-500">Idade: {idade} anos</p>
      </div>

      <p className="text-xs text-gray-400 truncate">{maskCPF(cpf)}</p>
    </div>
  );
}
