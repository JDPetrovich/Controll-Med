import { Plus } from "lucide-react";

type Props = {
  onClick: () => void;
};

export function AddPacienteCard({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
    flex flex-col gap-2 items-center justify-center
    w-full h-36
    rounded-2xl
    border-2 border-dashed border-teal-300
  text-teal-600
  hover:border-teal-500
  hover:text-teal-700
  hover:bg-teal-50
    transition
  "
    >
      <Plus className="w-8 h-8" />
      <span className="text-sm font-medium">Novo paciente</span>
    </button>

  );
}
