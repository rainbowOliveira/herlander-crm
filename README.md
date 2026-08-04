# Herlander CRM

CRM de gestão para estúdio de fotografia e vídeo — casamentos, eventos e corporativo.

Projeto de aprendizagem construído em fases incrementais. Consulta o [roadmap](herlander-crm-roadmap.md) para ver o plano completo.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Supabase](https://supabase.com) — base de dados, autenticação e armazenamento
- [Vercel](https://vercel.com) — deploy
- [Resend](https://resend.com) — emails (fase 10)
- [Anthropic Claude](https://anthropic.com) — sugestões de resposta por IA (fase 12)

## Desenvolvimento local

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env.local
# Preenche .env.local com as tuas chaves do Supabase

# 3. Arrancar o servidor de desenvolvimento
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) no browser.

## Variáveis de ambiente

Copia `.env.example` para `.env.local` e preenche com as chaves do teu projeto Supabase.  
O ficheiro `.env.local` **nunca é commitado** — está no `.gitignore`.
