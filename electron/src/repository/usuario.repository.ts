import IUsuario from "../interfaces/usuario/usuario.interface";
import { getDatabase } from "../module/sqlitedb/dbInstance.js";
import { getSupabase } from "../module/supabase/supabaseInstance.js";

const db = getDatabase();
const supabase = getSupabase();

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
        const { data, error } = await supabase
            .from('usuario')
            .insert([{
                nomeusuario: dadosUsuario.nomeusuario,
                codusuario: dadosUsuario.codusuario,
                senhausuario: dadosUsuario.senhausuario,
            }])
            .select();

        if (error) throw new Error("Erro ao criar usuario na nuvem: " + error.message);

        const sequsuario = data[0].sequsuario;

        const query = `
        INSERT INTO usuario (
        sequsuario,
        nomeusuario,
        idadeusuario,
        codusuario,
        senhausuario,
        cpfusuario
        ) VALUES (?,?,?,?,?,?)
        `;

        const parametros = [
            sequsuario,
            dadosUsuario.nomeusuario,
            dadosUsuario.idadeusuario,
            dadosUsuario.codusuario,
            dadosUsuario.senhausuario,
            dadosUsuario.cpfusuario
        ];

        await db.executar(query, parametros);
    }

    async atualizarUsuario(dadosUsuario: IUsuario): Promise<void> {
        const { error } = await supabase
            .from('usuario')
            .update({
                nomeusuario: dadosUsuario.nomeusuario,
                codusuario: dadosUsuario.codusuario,
                senhausuario: dadosUsuario.senhausuario
            })
            .eq('sequsuario', dadosUsuario.sequsuario);

        if (error) throw new Error("Erro ao atualizar usuario na nuvem: " + error.message);

        const query = `
            UPDATE usuario SET 
                nomeusuario = ?, 
                idadeusuario = ?, 
                codusuario = ?, 
                senhausuario = ?, 
                cpfusuario = ?
            WHERE sequsuario = ?
        `;
        const parametros = [
            dadosUsuario.nomeusuario,
            dadosUsuario.idadeusuario,
            dadosUsuario.codusuario,
            dadosUsuario.senhausuario,
            dadosUsuario.cpfusuario,
            dadosUsuario.sequsuario
        ];
        await db.executar(query, parametros);
    }

    async deletarUsuario(sequsuario: number): Promise<void> {
        const { error } = await supabase
            .from('usuario')
            .delete()
            .eq('sequsuario', sequsuario);

        if (error) throw new Error("Erro ao deletar usuario na nuvem: " + error.message);

        const query = `DELETE FROM usuario WHERE sequsuario = ?`;

        const parametros = [sequsuario];

        await db.executar(query, parametros);
    }
}

export { UsuarioRepository };