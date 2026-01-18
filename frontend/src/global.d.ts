import { IInfoAdicionalIpc } from "@/interfaces/infoadicional.interface";

export { };

declare global {
    interface Window {
        ipc: {
            send: (channel: string, ...args: any[]) => void;
            on: (channel: string, listener: (...args: any[]) => void) => void;
            invoke: (channel: string, ...args: any[]) => Promise<any>;
            
            buscarUsuarios: () => Promise<IUsuario>;
        }
    }
}


export interface RespostaIpc<T = any> {
    sucesso: boolean;
    mensagem: string;
    dados: T[];
}
