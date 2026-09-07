# Diretrizes e Política de Segurança (SECURITY.md)

Este documento descreve a arquitetura de segurança atual da plataforma **Tatu**, as salvaguardas implementadas no ciclo de hardening e as recomendações mandatórias para as próximas etapas de evolução do sistema (Autenticação de Usuários e Banco de Dados Neon PostgreSQL).

---

## 1. Visão Geral da Arquitetura Atual

No estágio atual de desenvolvimento, a plataforma opera como uma aplicação frontend robusta e reativa em React 19 com TypeScript rigoroso, utilizando persistência em cliente (`localStorage`).

### Salvaguardas Implementadas no Hardening:
- **Separação de Segredos**: Nenhuma chave privada, token ou credencial é injetada no bundle do cliente. O prefixo `VITE_` é estritamente controlado via `envPrefix` e validado em runtime através de `lib/env.ts`.
- **Sanitização contra XSS e Injeção**:
  - Utilitários de escape HTML (`escapeHtml`, `sanitizeHtml`) em `utils/sanitize.ts`.
  - Higienização e contenção de tamanho para nomes de usuário e entradas de formulário (`sanitizeUserName`).
- **Validação de Schemas e Tipos em Runtime**:
  - `utils/validation.ts` valida estruturas de dados recuperadas do `localStorage`, garantindo integridade de estado contra manipulações arbitrárias no navegador.
- **Camada HTTP Centralizada e Segura**:
  - `lib/api/httpClient.ts` centraliza todas as chamadas de rede com timeout configurável (10s padrão), política de retentativas para erros de rede transitórios (5xx) e injeção controlada de cabeçalhos de autorização via Bearer Token.
- **Estrutura de Autenticação Preparatória**:
  - Interfaces contratuais limpas em `types/auth.ts` e serviços desacoplados em `lib/auth/authService.ts`.
  - Armazenamento em memória volátil (`tokenStorage.ts`) mitigando riscos de roubo de sessão via scripts maliciosos.
- **Error Boundary e Logging Seguro**:
  - `ErrorBoundary.tsx` captura exceções de renderização sem vazar stack traces sensíveis para o usuário final.
  - `utils/logger.ts` redige automaticamente chaves sensíveis (`password`, `token`, `secret`, `authorization`, etc.) e desativa logs verbosos em ambiente de produção.
- **TypeScript com Rigor Máximo**:
  - `"strict": true`, `"noImplicitAny": true`, `"strictNullChecks": true`, eliminando o uso de `any` em toda a base de código.

---

## 2. Recomendações para Implementação de Autenticação (Fase Futura)

Quando o sistema de autenticação for implementado, as seguintes regras devem ser seguidas:

### 2.1. Gestão de Tokens e Sessão
- **Nunca armazene tokens de sessão (JWT de acesso/refresh) em `localStorage` ou `sessionStorage`**. O armazenamento local é acessível por qualquer JavaScript em execução na origem (XSS).
- **Adote cookies `HttpOnly`, `Secure` e `SameSite=Strict` ou `SameSite=Lax`** para a transmissão do refresh token.
- Mantenha o **Access Token (JWT de curta duração, 5-15 min) em memória** na aplicação cliente (como já preparado em `lib/auth/tokenStorage.ts`), renovando-o silenciosamente via endpoint `/api/auth/refresh`.

### 2.2. Prevenção de Ataques de Força Bruta
- Implemente **Rate Limiting** rigoroso nas rotas de autenticação (`/api/auth/login`, `/api/auth/register`, `/api/auth/reset-password`).
- Utilize algoritmos modernos de hash de senha no servidor (Argon2id ou Bcrypt com fator de custo >= 12).
- Nunca processe ou gere hashes de senhas no frontend.

### 2.3. Proteção CSRF
- Para rotas que utilizam cookies de autenticação, implemente tokens anti-CSRF (`Double Submit Cookie` ou cabeçalhos customizados validados no backend).

---

## 3. Recomendações para Integração com Neon PostgreSQL (Fase Futura)

Quando a persistência migrar de `localStorage` para Neon PostgreSQL, siga estritamente estas diretrizes:

### 3.1. Arquitetura Server-Side Mandatória
- **O cliente frontend JAMAIS deve se conectar diretamente ao banco de dados Neon**.
- Todas as operações devem passar por uma camada de API backend (Express, Cloud Run, Serverless Functions) com autenticação e autorização prévia por rota.
- A connection string `DATABASE_URL` deve residir exclusivamente como variável de ambiente do servidor, jamais com prefixo `VITE_`.

### 3.2. Prevenção de SQL Injection
- **Nunca concatene strings para montar queries SQL**.
- Utilize um ORM/Query Builder moderno com prepared statements (ex: Drizzle ORM com `@neondatabase/serverless`).
- Todas as entradas recebidas nas rotas da API devem ser validadas com schemas estritos (ex: Zod) antes de atingir o banco de dados.

### 3.3. Princípio do Menor Privilégio (Least Privilege)
- Crie usuários de banco de dados com permissões estritas apenas às tabelas e operações necessárias.
- Utilize conexões com SSL obrigatório (`?sslmode=require`).
- Utilize o Connection Pooler do Neon (porta 6543 ou endpoint `-pooler`) para gerenciar conexões em ambientes de alto paralelismo.

---

## 4. Cabeçalhos de Segurança Recomendados (HTTP Security Headers)

Para o ambiente de produção e deploy:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://*.googleapis.com; object-src 'none'; frame-ancestors 'self';
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

## 5. Como Reportar Vulnerabilidades

Caso identifique uma vulnerabilidade ou comportamento suspeito de segurança, entre em contato imediatamente com a equipe de engenharia antes de qualquer divulgação pública.
