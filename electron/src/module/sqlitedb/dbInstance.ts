import { app } from "electron";
import path from "path";
import { DatabaseSQLite } from "./sqlite.js";

let db: DatabaseSQLite | null = null;

export function getDatabase() {
    if (!db) {
        const caminhoBanco = path.join(app.getPath("userData"), "Controll_med.sqlite");
        db = new DatabaseSQLite(caminhoBanco);
    }
    return db;
}
