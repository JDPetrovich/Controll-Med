import IUsuario from "../interfaces/usuario/usuario.interface";
import { getDatabase } from "../module/sqlitedb/dbInstance.js";

const db = getDatabase();

class UsuarioRepository {
    async buscarUsuarios(): Promise<IUsuario[]> {
        const query = `
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

    async criarUsuario(dadosUsuario: IUsuario): Promise<void> {
        const query = `
    INSERT INTO usuario (
    nomeusuario,
    idadeusuario,
    codusuario,
    senhausuario,
    cpfusuario
    ) VALUES (?,?,?,?,?)
    `

        const parametros = [
            dadosUsuario.nomeusuario,
            dadosUsuario.idadeusuario,
            dadosUsuario.codusuario,
            dadosUsuario.senhausuario,
            dadosUsuario.cpfusuario
        ];

        await db.executar(query, parametros);
    }

    async deletarUsuario(sequsuario: number): Promise<void> {
        const query=`
        DELETE FROM usuario
        WHERE sequsuario = ?
        `

        const parametros = [sequsuario];

        await db.executar(query, parametros);
    }
}

export { UsuarioRepository };