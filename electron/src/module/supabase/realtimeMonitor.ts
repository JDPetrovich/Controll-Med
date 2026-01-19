import { getDatabase } from "../sqlitedb/dbInstance.js";
import { getSupabase } from "./supabaseInstance.js";

export function iniciarMonitoramentoRealtime() {
    const supabase = getSupabase();
    const db = getDatabase();

    console.log("Monitoramento Realtime iniciado...");

    supabase
        .channel('fluxo-remedios')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'historico_remedios'
            },
            async (payload) => {
                const dados = payload.new;
                console.log('Novo registro recebido do Supabase:', dados);

                /*   try {
                      await db.executar(
                          "INSERT INTO historico_remedios (paciente_id, descricao_remedio, status, data_confirmacao) VALUES (?, ?, ?, ?)",
                          [dados.paciente_id, dados.descricao_remedio, dados.status, dados.created_at]
                      );
                      
                  } catch (error) {
                      console.error("Erro ao salvar dados do Supabase no SQLite:", error);
                  } */
            }
        )
        .subscribe();
}