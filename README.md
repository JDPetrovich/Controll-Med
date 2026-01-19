# 🏥 ControllMed Express

O **ControllMed Express** é um ecossistema de saúde projetado para garantir a precisão na administração de medicamentos. Ele utiliza uma arquitetura híbrida para conectar administradores (Desktop) e cuidadores/pacientes (Mobile) em tempo real.

---

## 🧠 Arquitetura do Sistema

O sistema opera em três camadas principais, cada uma com uma responsabilidade específica para evitar sobrecarga de dados e garantir a segurança.

### 1. O Cérebro: Regras de Medicamentos (Master Rules)
Em vez de gerar milhares de registros individuais para tratamentos longos ou contínuos, o sistema trabalha com **Regras Mestres**.
* **Como funciona:** O administrador define no Desktop a regra (Ex: *Remédio X, de 8 em 8 horas, com 10 min de tolerância*). 
* **Eficiência:** O banco de dados armazena apenas **uma linha** por medicamento. O cálculo de quando será a próxima dose é feito dinamicamente pela interface (Front-end), economizando processamento e armazenamento.



### 2. A Fonte da Verdade: Nuvem (Supabase)
O Supabase atua como a ponte de comunicação instantânea:
* **Segurança RLS:** Cada tabela possui políticas de acesso rigorosas (Row Level Security). O Desktop tem permissão total (CRUD), enquanto o Mobile foca na leitura das regras e inserção do histórico.
* **Realtime (WebSockets):** Sempre que um remédio é confirmado no Mobile, o Supabase "avisa" o Desktop instantaneamente via WebSocket, sem necessidade de atualizar a página.

### 3. A Memória Local: Persistência (SQLite)
O App Desktop mantém uma cópia completa dos dados localmente:
* **Resiliência:** Mesmo sem internet, o administrador tem acesso ao histórico completo dos pacientes.
* **Sincronização de Inicialização:** Se o computador for desligado, ao abrir o app, ele realiza um "Catch-up" automático (Sincronização Inicial) para buscar na nuvem tudo o que aconteceu enquanto esteve offline.

---

## 🔄 Fluxo de Operação

1.  **Configuração:** O administrador cadastra o paciente e a regra do medicamento no App Desktop. O dado é salvo simultaneamente no **Supabase** (para o mobile) e no **SQLite** (local).
2.  **Monitoramento:** O Mobile calcula a próxima dose baseada na regra. No momento da confirmação pelo cuidador, um registro nasce na tabela `historico_remedios`.
3.  **Alerta de Atraso:** O sistema compara a `hora_atual` com a `hora_prevista + tolerância`. Se a confirmação não existir após esse tempo, a interface sinaliza visualmente o atraso para o administrador no Desktop.
4.  **Conclusão:** O registro de confirmação é enviado via Realtime para o Desktop, que o armazena permanentemente no banco de dados local.



---

## 🛠️ Tecnologias Utilizadas

* **Interface Desktop:** React + Tailwind CSS (Interface reativa e scannable).
* **Interface Mobile:** React Native + Expo + Tamagui (Alta performance e design moderno).
* **Engine Desktop:** Electron (Processamento de back-end e acesso ao sistema).
* **Banco Local:** SQLite (Persistência segura e rápida na máquina).
* **Banco Nuvem:** PostgreSQL via Supabase (Escalabilidade, Segurança RLS e Realtime).

---
*Documentação em constante atualização conforme o desenvolvimento do projeto.*