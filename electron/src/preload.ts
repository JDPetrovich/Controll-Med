import { contextBridge, ipcRenderer } from "electron";
import IUsuario from "./interfaces/usuario/usuario.interface";

contextBridge.exposeInMainWorld("ipc", {
    buscarUsuarios: () => ipcRenderer.invoke("retornar-usuarios"),
    criarUsuario: (dadosUsuario: IUsuario) => ipcRenderer.invoke("criar-usuario", dadosUsuario),

    send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
    invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args),
    on: (channel: string, listener: (...args: any[]) => void) =>
        ipcRenderer.on(channel, listener),
});