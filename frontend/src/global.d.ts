import { IInfoAdicionalIpc } from "@/interfaces/infoadicional.interface";
import type { UsuarioFormOutput } from "./schema/usuario.schema";

export { };

declare global {
    interface Window {
        ipc: {
            send: (channel: string, ...args: any[]) => void;
            on: (channel: string, listener: (...args: any[]) => void) => void;
            invoke: (channel: string, ...args: any[]) => Promise<any>;
            
            buscarUsuarios: () => Promise<IUsuario>;
            criarUsuario: (dadosUsuario: UsuarioFormOutput) => Promise<RespostaIpc>;
            atualizarUsuario: (dadosUsuario: UsuarioFormOutput) => Promise<RespostaIpc>;
            deletarUsuario: (sequsuario: number) => Promise<RespostaIpc>;
        }
    }
}

export interface RespostaIpc<T = any> {
    sucesso: boolean;
    mensagem: string;
    dados: T[];
}
