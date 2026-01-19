import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: React.ReactNode;
  loading?: boolean;
};

export function ConfirmModal({ open, onOpenChange, onConfirm, title, description, loading }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-slate-800">{title}</DialogTitle>
          <DialogDescription className="text-slate-500 pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 ">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Excluir Paciente"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}