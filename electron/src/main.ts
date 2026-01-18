import { app, BrowserWindow } from "electron";
if (!app.isPackaged) {
    await import("dotenv/config");
}
import ControllMed from "./app/ControllMed.js";
import { getDatabase } from "./module/sqlitedb/dbInstance.js";
import { usuariohandle } from "./handlers/usuario.handle.js";

app.whenReady().then(async () => {
    
    const db = getDatabase();
    await db.conectar();   
    usuariohandle();

    ControllMed();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        ControllMed();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("before-quit", async () => {
    const db = getDatabase();
    await db.fecharConexao();
});
