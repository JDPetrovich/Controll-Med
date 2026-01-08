1. Principio
 - A ideia do projeto é um Gestor de Saúde Pessoal focado em Medicamentos.

 - Problema: Pessoas esquecem de tomar
   remédios ou são pegas de surpresa quando algum remédio acaba.

 - Solução: Um sistema onde você gerencia tudo
   pelo computador e recebe notificações/mensagens no celular avisando que é o horário de tomar o remédio ou estoque de remédio acabando.
   
2. O vamos armazenar e por quê

 - Banco local(sqlite priovavelmente)
   Nele vamos armazenar dados detalhados dos remédios (nome(com g/mg), dosagem (diaria ou dias informados), quantidade total, quando toma(podendo ser diaria ou dias informados), horário que toma, dia que pega/compra, quantidade que pega/compra).
   A ideia é que esse dados mais sensiveis fiquem no pc do usuário.

 - "Banco" na nuvem(supabase ou similar)
   Ele será essencial para as noticações - horário do priximo alerta, com a mensagem já preparada e tratada para aquele alerta.
   A ideia é que se o computador estiver desligado ou o app fechado, ele já tenha isso guardado e consiga avisar o usuário no horário.  

3. Tecnologias pensadas
 - Interface: React, Vite e TypeScript

 - Backend: Electron e TypeScript

 - Banco local: SQLite

 - Banco/Nuvem: Supabase(ou algo similar)

 - Notificação: Pode ser um bot do telegram ou
   fazer um app mobile e integrar o banco/nuvem nele, e usar ele apenas para essas notificações.
