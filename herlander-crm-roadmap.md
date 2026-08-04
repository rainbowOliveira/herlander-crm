# Herlander CRM — Roadmap do Produto

CRM de gestão para um estúdio de fotografia e vídeo (casamentos, eventos e corporativo),
centrado na **colaboração em equipa**. Projeto de aprendizagem construído em passos
pequenos, testáveis e explicáveis.

---

## 1. Visão

Uma web app onde a Catarina (administradora) gere o estúdio e a sua equipa de
colaboradores (fotógrafos, videógrafos, editores). O sistema permite:

- Registar clientes e as suas sessões (casamento, evento, corporativo).
- Atribuir colaboradores a cada sessão.
- Cada colaborador vê no seu calendário apenas as sessões que lhe estão atribuídas,
  com toda a informação necessária (local, horários, contactos, notas, moodboard,
  ponto de encontro e boleias).
- Saber quem está disponível numa data antes de atribuir, sem dar trabalho ao colaborador.
- Automatizar emails para o cliente e preparar mensagens de WhatsApp num clique.
- Sugerir respostas escritas por IA no estilo da Catarina.

Este documento é a base do projeto. Cada fase é uma fatia vertical fina: algo que
funciona de ponta a ponta e que se consegue testar sozinho antes de avançar.

---

## 2. O que está DENTRO e o que está FORA (por agora)

**Dentro do âmbito atual**
- Autenticação e contas de utilizador (equipa).
- Papéis: Administrador (Catarina) e Colaborador (fotógrafo/videógrafo/editor, todos com as mesmas permissões).
- Clientes, sessões, atribuições, calendário, ficheiros/moodboard.
- Gestão leve de disponibilidade.
- Lembretes baseados no tempo.
- Emails automatizados a sério.
- WhatsApp assistido por link (`wa.me`).
- Sugestões de resposta por IA no estilo da Catarina.
- Resumo na app das últimas mensagens de **email** do cliente.

**Fora do âmbito atual (possível futuro)**
- Receber pagamentos online.
- Portal do cliente (o cliente não entra no sistema).
- Galerias/entrega de fotos ao cliente.
- Propostas e contratos formais.
- Caixa de entrada unificada com **WhatsApp** e **Instagram** (exige APIs do Meta com
  aprovação; a app fica preparada para receber estes canais mais tarde, mas não se
  constroem já).

---

## 3. Stack tecnológica

- **Frontend / app:** Next.js (App Router) + TypeScript, com Tailwind CSS e componentes
  no estilo v0 / shadcn-ui.
- **Base de dados + autenticação:** Supabase (Postgres + Supabase Auth + Storage).
- **Deploy:** Vercel.
- **Emails:** Resend.
- **IA:** API da Anthropic (Claude), sempre chamada a partir do servidor.
- **Ambiente de desenvolvimento:** Claude Code.

---

## 4. Princípios de trabalho

1. **Fatias verticais finas.** Cada fase entrega algo que funciona de ponta a ponta,
   não uma camada técnica isolada.
2. **Sempre testável pela Catarina.** Cada fase termina com um teste manual simples,
   descrito em linguagem clara.
3. **Explicar antes de avançar.** No fim de cada fase, o assistente explica o que foi
   construído e porquê, e a Catarina deve conseguir explicar por palavras suas o que o
   sistema faz agora.
4. **O tempo é injetado, nunca assumido.** Nenhuma lógica de negócio lê a data atual
   diretamente. Existe sempre uma forma de "viajar no tempo" em desenvolvimento
   (ver Fase 9). Isto resolve a dificuldade de testar lembretes.
5. **Segurança adequada, desde cedo.** Autenticação feita pelo Supabase (nunca à mão),
   Row Level Security (RLS) ligado, e segredos (chaves de API) só no servidor.
6. **Preparado para crescer, sem construir o futuro já.** As decisões de estrutura não
   fecham a porta a pagamentos, portal do cliente ou canais de mensagens futuros.

---

## 5. Fases

> Cada fase tem: **Objetivo**, **O que se constrói**, **Foco de aprendizagem**,
> **Segurança** (quando aplicável) e **Teste no fim** (como saber que está feito).

### Fase 0 — Fundações: "está no ar"
- **Objetivo:** ter o esqueleto do projeto publicado e ligado à base de dados.
- **O que se constrói:** projeto Next.js com Tailwind; deploy na Vercel; ligação ao
  Supabase; uma página que lê e mostra uma linha de teste da base de dados.
- **Foco de aprendizagem:** como encaixam Next.js, Supabase e Vercel; variáveis de
  ambiente e segredos.
- **Segurança:** chaves guardadas como variáveis de ambiente, nunca no código.
- **Teste no fim:** abrir o site publicado e ver dados vindos da base de dados.

### Fase 1 — Autenticação e a tua conta
- **Objetivo:** conseguir entrar e sair com segurança; ter uma área privada.
- **O que se constrói:** registo, login e logout com Supabase Auth; um painel privado
  visível apenas depois de entrar.
- **Foco de aprendizagem:** autenticação (objetivo central do projeto); sessões.
- **Segurança:** primeiras regras de RLS; páginas protegidas no servidor.
- **Teste no fim:** sem sessão, o painel não é acessível; com sessão, é.

### Fase 2 — Clientes (contactos)
- **Objetivo:** registar e gerir clientes.
- **O que se constrói:** criar, ver, editar e apagar clientes (nome, contactos, notas).
- **Foco de aprendizagem:** operações de base de dados (CRUD), formulários e validação.
- **Segurança:** cada registo pertence à conta; RLS garante que só a dona o vê.
- **Teste no fim:** criar um cliente, recarregar a página e continuar lá; editar e apagar.

### Fase 3 — Sessões / projetos (o coração)
- **Objetivo:** registar sessões e ligá-las a clientes.
- **O que se constrói:** criar uma sessão do tipo casamento, evento ou corporativo,
  associada a um cliente, com data/hora, local, ponto de encontro e notas.
- **Foco de aprendizagem:** relações entre tabelas (sessão pertence a cliente).
- **Teste no fim:** criar um casamento para um cliente e vê-lo na lista de sessões.

### Fase 4 — Vista de calendário
- **Objetivo:** ver as sessões num calendário.
- **O que se constrói:** calendário mensal com as sessões nas respetivas datas; clicar
  numa sessão abre o detalhe.
- **Foco de aprendizagem:** mostrar dados organizados por data; interface.
- **Teste no fim:** a sessão aparece no dia certo e abre ao clicar.

### Fase 5 — Equipa e papéis
- **Objetivo:** ter mais do que uma conta, com níveis de acesso diferentes.
- **O que se constrói:** convidar colaboradores; distinguir Administrador de Colaborador;
  o administrador vê tudo, o colaborador vê uma área restrita.
- **Foco de aprendizagem:** múltiplos utilizadores; papéis; RLS por papel — a parte mais
  importante de segurança.
- **Segurança:** as regras de acesso passam a depender do papel do utilizador.
- **Teste no fim:** entrar com uma conta de colaborador e confirmar que a vista é restrita.

### Fase 6 — Atribuir colaboradores a sessões
- **Objetivo:** ligar colaboradores às sessões em que trabalham.
- **O que se constrói:** atribuir um ou mais colaboradores a uma sessão; o calendário e
  o painel do colaborador mostram apenas as sessões que lhe estão atribuídas.
- **Foco de aprendizagem:** relação muitos-para-muitos (sessão ↔ utilizador); consultas
  filtradas por permissão.
- **Segurança:** um colaborador nunca vê sessões que não são suas.
- **Teste no fim:** atribuir a Ana a um casamento — a Ana vê-o, o Rui não.

### Fase 7 — Detalhe rico da sessão e ficheiros
- **Objetivo:** ter numa sessão toda a informação a partilhar com quem está atribuído.
- **O que se constrói:** anexar à sessão local e horários, contactos do casal/cliente,
  notas, lista de planos (shot list), ficheiros/moodboard e informação de ponto de
  encontro/boleias. Visível para os colaboradores atribuídos.
- **Foco de aprendizagem:** armazenamento de ficheiros (Supabase Storage) e a sua segurança.
- **Segurança:** só quem está atribuído acede aos ficheiros da sessão.
- **Teste no fim:** carregar uma imagem de moodboard; o colaborador atribuído vê-a, um
  não atribuído não.

### Fase 8 — Disponibilidade (com pouco esforço)
- **Objetivo:** saber quem está livre antes de atribuir, sem dar trabalho ao colaborador.
- **O que se constrói:** o colaborador marca rapidamente dias/períodos em que está
  indisponível; ao atribuir alguém a uma data, o sistema avisa se essa pessoa está
  indisponível ou já tem sessão nesse dia.
- **Foco de aprendizagem:** mais lógica de datas; deteção de conflitos.
- **Teste no fim:** marcar a Ana como indisponível num dia e, ao tentar atribuí-la a esse
  dia, receber um aviso.

### Fase 9 — Motor de tempo e lembretes
- **Objetivo:** resolver de forma limpa a dificuldade de testar a passagem do tempo.
- **O que se constrói:** um "relógio" injetável (o sistema pergunta "que horas são?" a um
  único sítio, controlável em desenvolvimento); as regras de lembrete tornam-se funções
  puras do tipo "o que está pendente à data X?"; um controlo de "viajar no tempo" apenas
  em desenvolvimento. Lembretes como: sessão daqui a X dias, seguimento após um pedido,
  prazo de entrega a aproximar-se.
- **Foco de aprendizagem:** testar comportamento dependente do tempo sem ter de esperar
  que o tempo passe.
- **Teste no fim:** definir uma data falsa para a véspera de uma sessão e ver o lembrete
  de "amanhã" aparecer.

### Fase 10 — Emails automatizados (a sério)
- **Objetivo:** enviar emails automáticos e desencadeados por eventos.
- **O que se constrói:** integração com o Resend; modelos de email; envios ligados ao
  motor de tempo (confirmações, lembretes, seguimentos).
- **Foco de aprendizagem:** envio de emails (objetivo central); tarefas desencadeadas.
- **Segurança:** a chave do serviço de email só existe no servidor.
- **Teste no fim:** com uma data falsa, disparar um lembrete e receber mesmo o email na
  tua caixa de entrada.

### Fase 11 — WhatsApp assistido por link
- **Objetivo:** preparar mensagens de WhatsApp num clique, sem a API do Meta.
- **O que se constrói:** a partir de modelos, o sistema gera um link `wa.me` já com o
  texto preenchido para o cliente certo; um clique abre o WhatsApp com a mensagem pronta.
- **Foco de aprendizagem:** construção de links externos com variáveis; reutilização dos
  modelos de mensagem.
- **Teste no fim:** clicar no botão e o WhatsApp abrir com o texto correto.

### Fase 12 — Respostas sugeridas por IA no teu estilo
- **Objetivo:** obter rascunhos de resposta que soam à Catarina.
- **O que se constrói:** integração com a API da Anthropic; guardar exemplos do teu estilo
  de escrita; dado uma mensagem do cliente, o sistema sugere uma resposta no teu tom
  (para email ou para o texto do WhatsApp assistido).
- **Foco de aprendizagem:** integração de LLM (objetivo central); construção de instruções;
  manter a chave de API do lado do servidor.
- **Segurança:** a chave da IA nunca chega ao navegador.
- **Teste no fim:** colar uma mensagem de cliente e receber uma sugestão de resposta com
  o teu tom, que podes editar antes de enviar.

### Fase 13 — Mensagens centralizadas (email primeiro)
- **Objetivo:** ver e resumir as últimas mensagens do cliente dentro da app.
- **O que se constrói:** trazer as respostas de email para dentro da app, associadas à
  sessão/cliente certo; mostrar as mensagens mais recentes; resumo por IA das mensagens
  recentes.
- **Foco de aprendizagem:** receber e interpretar emails; sumarização.
- **Teste no fim:** uma resposta de email aparece debaixo da sessão certa, com um resumo.

### Fase 14 — Exportar para o Google Calendar (desejável, não essencial)
- **Objetivo:** ver as sessões atribuídas também no Google Calendar.
- **O que se constrói:** uma subscrição de calendário (feed ICS) por colaborador com as
  suas sessões atribuídas — a forma mais simples, sem necessidade de login Google.
- **Foco de aprendizagem:** feeds de calendário / integrações leves.
- **Teste no fim:** subscrever o feed no Google Calendar e ver lá as sessões atribuídas.

---

## 6. Backlog / futuro (fora do âmbito atual)

Ideias registadas para não se perderem, mas explicitamente adiadas:

- **Caixa de entrada unificada real** com WhatsApp e Instagram, através das APIs do Meta
  (WhatsApp Business Cloud API e Instagram Messaging API). Implica conta de empresa,
  aprovação de modelos de mensagem pela Meta, janelas de 24 horas e custos por mensagem.
- **Envio automático real por WhatsApp** (substituindo o link assistido), quando o volume
  justificar a complexidade.
- **Portal do cliente:** o cliente entra para ver propostas ou informação.
- **Propostas e contratos** formais dentro do sistema.
- **Galerias / entrega de material** ao cliente.
- **Pagamentos online.**

---

## 7. Nota sobre testes e "explicar o que se passa"

Como o objetivo é aprender e a Catarina prefere passos pequenos e verificáveis:

- Nenhuma fase avança sem o **teste no fim** passar.
- No final de cada fase, o assistente resume em linguagem simples o que mudou, e a
  Catarina reformula por palavras suas — se não conseguir explicar, revê-se antes de seguir.
- Toda a lógica sensível ao tempo passa pelo motor de tempo da Fase 9, para poder ser
  testada com datas à escolha em vez de esperar pelo calendário real.
