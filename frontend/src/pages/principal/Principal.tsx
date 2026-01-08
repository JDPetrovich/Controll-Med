import { Skeleton } from "@/components/ui/skeleton";

export default function Principal() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="flex flex-col items-center gap-6 text-center max-w-md">
                <h1 className="text-3xl font-bold tracking-tight">Seja bem-vindo</h1>

                <p className="text-muted-foreground">
                    Página básica para este projeto base de desktop com Electron,
                    TypeScript, Shadcn, Tailwind e React.
                </p>

                <div className="w-full space-y-2 justify-center align-center">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-2/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            </div>
        </div>
    );
}
