import { Plus } from "lucide-react";

type Props = {
  onClick: () => void;
};

export function AddPacienteCard({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center justify-center
        w-full h-36
        rounded-xl border-2 border-dashed
        border-muted-foreground/40
        hover:border-primary
        hover:bg-muted/40
        transition
      "
    >
      <Plus className="w-8 h-8 text-muted-foreground" />
    </button>
  );
}
