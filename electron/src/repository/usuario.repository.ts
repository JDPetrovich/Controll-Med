import IUsuario from "../interfaces/usuario/usuario.interface";
import { getDatabase } from "../module/sqlitedb/dbInstance.js";

const db = getDatabase();

class UsuarioRepository{
 async buscarUsuarios(): Promise<IUsuario[]> {
    const query=`
    SELECT 
        sequsuario,
        nomeusuario,
        idadeusuario,
        codusuario,
        senhausuario,
        cpfusuario
    FROM usuario    
    `;

    const resultado = await db.consultar<IUsuario>(query, []);
    return resultado;
 }
 
}

export { UsuarioRepository };