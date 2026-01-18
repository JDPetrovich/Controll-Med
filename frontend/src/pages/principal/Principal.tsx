import { useState, useEffect } from "react";
import { Header } from "@/components/header/header";
import { CreatePacienteModal } from "@/components/paciente/createPacienteModal";
import { PacienteCard } from "@/components/paciente/pacienteCard";
import { AddPacienteCard } from "@/components/paciente/addPacienteCard";
import type { UsuarioFormInput } from "@/schema/usuario.schema";

export default function Principal() {
    const [open, setOpen] = useState(false);
    const [pacientes, setPacientes] = useState<UsuarioFormInput[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<UsuarioFormInput | null>(null);

    const carregarPacientes = async () => {
        const respostaIpc = await window.ipc.buscarUsuarios();

        if (respostaIpc.sucesso) {
            setPacientes(respostaIpc.dados);
        } else {
            console.error("Erro IPC:", respostaIpc.mensagem);
        }
    };

    useEffect(() => {
        carregarPacientes();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="flex flex-col items-center gap-6 mt-20">
                <h1 className="text-3xl font-bold">Seja bem-vindo</h1>

                {/* CARD GRANDE */}
                <div className="w-full max-w-7xl rounded-2xl border p-6 bg-gray-50">
                    <h2 className="text-xl font-semibold mb-4">
                        Pacientes
                    </h2>

                    {/* GRID DOS CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {pacientes.map((p, index) => (
                            <PacienteCard
                                key={index}
                                nome={p.nomeusuario}
                                idade={p.idadeusuario}
                                cpf={p.cpfusuario}
                                onClick={() => {
                                    console.log("Abrir detalhes do paciente");
                                    // aqui vai navegar para a página de detalhes
                                }}
                                onEdit={() => {
                                    setSelectedPatient(p);
                                    setOpen(true);
                                }}
                            />
                        ))}


                        {/* CARD DE ADICIONAR */}
                        <AddPacienteCard onClick={() => setOpen(true)} />
                    </div>
                </div>
            </main>

            <CreatePacienteModal
                open={open}
                onOpenChange={(isOpen) => {
                    if (!isOpen) setSelectedPatient(null);
                    setOpen(isOpen);
                }}
                paciente={selectedPatient}
            />
        </div>
    );
}
