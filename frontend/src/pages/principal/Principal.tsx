import { useState } from "react";
import { Header } from "@/components/header/header";
import { CreatePacienteModal } from "@/components/paciente/createPacienteModal";
import { PacienteCard } from "@/components/paciente/pacienteCard";
import { AddPacienteCard } from "@/components/paciente/addPacienteCard";
import type { UsuarioOutput } from "@/schema/usuario.schema";

export default function Principal() {
    const [open, setOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<UsuarioOutput | null>(null);

   const patients: UsuarioOutput[] = [
  {
    nomeusuario: "João Silva",
    idadeusuario: 32,
    codusuario: "001",
    senhausuario: "123456",
    cpfusuario: "123.456.789-00",
  },
  {
    nomeusuario: "Maria Oliveira",
    idadeusuario: 28,
    codusuario: "002",
    senhausuario: "abcdef",
    cpfusuario: "987.654.321-00",
  },
    {
    nomeusuario: "João Silva",
    idadeusuario: 32,
    codusuario: "001",
    senhausuario: "123456",
    cpfusuario: "123.456.789-00",
  },
  {
    nomeusuario: "Maria Oliveira",
    idadeusuario: 28,
    codusuario: "002",
    senhausuario: "abcdef",
    cpfusuario: "987.654.321-00",
  },
  
];


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
                        {patients.map((p, index) => (
                            <PacienteCard
                                key={index}
                                nome={p.nomeusuario}
                                idade={String(p.idadeusuario)}
                                cpf={p.cpfusuario}
                                onClick={() => {
                                    console.log("Abrir detalhes do paciente");
                                    // aqui navegar para a página de detalhes
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
