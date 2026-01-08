import { app, BrowserWindow } from "electron";
if (!app.isPackaged) {
    await import("dotenv/config");
}
import Principal from "./app/principal.js";
import { getDatabase } from "./module/sqlitedb/dbInstance.js";

app.whenReady().then(async () => {
    /*
    const config = getAppConfig();
    const db = getDatabase();
    await db.conectar();
    */

    Principal();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        // const config = getAppConfig();
        Principal();
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
