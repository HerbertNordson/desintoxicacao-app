# DesintoxicAÇÃO — React + Supabase

Aplicação React/Vite com autenticação por e-mail/senha e persistência individual no Supabase.

## 1. Configurar o Supabase
1. Crie um projeto em https://supabase.com/.
2. No painel, abra SQL Editor e execute todo o arquivo `supabase/schema.sql`.
3. Em Authentication > Sign In / Providers, mantenha Email habilitado.
4. Em Authentication > Settings, desative novos cadastros públicos (Allow new users to sign up), pois o acesso será concedido manualmente. A nomenclatura pode variar no painel.
5. Em Authentication > Users, crie as duas contas (seu e-mail e o de Jéssica). Use senhas fortes e compartilhe cada senha diretamente com seu titular.
6. Copie a Project URL e a chave publishable (ou anon/legacy) do painel API/Connect. Nunca use a `service_role` no frontend.

## 2. Variáveis de ambiente
Copie `.env.example` para `.env.local` e preencha os valores reais:
```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLISHABLE_OU_ANON
```
Reinicie o servidor Vite após alterar as variáveis.

## 3. Executar
```bash
npm install
npm run dev
```

## 4. Publicar na Vercel
Importe o repositório Git na Vercel e cadastre as mesmas variáveis em Project Settings > Environment Variables para Production (e Preview, se necessário). Faça redeploy após cadastrar/alterar as variáveis.

## Segurança e modelo de dados
- `profiles`: nome de exibição associado ao usuário Auth.
- `daily_progress`: uma linha por usuário e data; as práticas ficam em JSONB.
- `daily_journal`: uma linha por usuário e data para reflexão e gratidão.
- RLS está habilitado em todas as tabelas e as políticas limitam operações a `auth.uid() = user_id` (ou `id`, no perfil).
- A aplicação não oferece fluxo de cadastro público; login apenas. Crie usuários no painel Supabase.
- Nunca publique a chave `service_role` no frontend ou na Vercel como variável `VITE_*`.

## Notas
- A jornada está configurada para 15–29 de outubro de 2026. Ajuste `START_DATE` e `SPECIAL_DATE` em `src/App.jsx` caso necessário.
- O histórico local anterior no `localStorage` não é migrado automaticamente para a nuvem.
- O acesso é individual e privado; cada usuário vê somente seus próprios checklists e diário.
# desintoxicacao-app
