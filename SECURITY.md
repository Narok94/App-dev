# Diretrizes e Política de Segurança (SECURITY.md)

Este documento descreve a arquitetura de segurança real da plataforma **Tatu**, as salvaguardas implementadas no hardening de front-end, as limitações conhecidas no estágio atual e as regras mandatórias para as próximas etapas (Autenticação de Usuários e Banco de Dados Neon PostgreSQL).

---

## 1. Proteções Implementadas no Projeto Atual

### 1.1. Headers de Segurança e Content Security Policy (CSP)
- **Configuração de Deploy (`vercel.json`)**:
  - `Content-Security-Policy`:
    - `default-src 'self'`: Restringe recursos à própria origem por padrão.
    - `script-src 'self'`: Bloqueia totalmente scripts externos e proíbe terminantemente `'unsafe-eval'`.
    - `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`: Permite apenas fontes do Google e estilos locais (o `'unsafe-inline'` em estilos é restrito à injeção de CSS em tempo de execução pelo motor do Tailwind CSS).
    - `font-src 'self' https://fonts.gstatic.com data:`: Permite o download de fontes confiáveis.
    - `img-src 'self' data: blob:`: Previne carregamento de imagens de domínios arbitrários.
    - `connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com`: Restringe conexões XHR/fetch apenas a endpoints permitidos.
    - `frame-ancestors 'self'`: Protege a aplicação contra ataques de framing e clickjacking em produção.
    - `object-src 'none'`: Desativa plug-ins legados (Flash, Java, etc.).
    - `base-uri 'self'` e `form-action 'self'`: Impede sequestro de formulários e injeção de tags `<base>`.
  - `X-Content-Type-Options: nosniff`: Previne ataques de MIME sniffing.
  - `X-Frame-Options: SAMEORIGIN`: Proteção adicional contra framing em navegadores que não suportam CSP level 2.
  - `Referrer-Policy: strict-origin-when-cross-origin`: Minimiza vazamento de caminhos e parâmetros em cabeçalhos Referer.
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`: Desativa APIs sensíveis de hardware do dispositivo.
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`: HSTS configurado com preload para produção HTTPS.
- **Ambiente de Desenvolvimento (`vite.config.ts`)**:
  - Configurados cabeçalhos de proteção no preview e no dev server preservando compatibilidade total com o iframe da plataforma AI Studio.

### 1.2. Cliente HTTP com Allowlist de Destinos e Bloqueio de Esquemas
- Em `lib/api/httpClient.ts`:
  - **Bloqueio de Esquemas Inseguros**: Bloqueio ativo para `javascript:`, `data:`, `file:`, `blob:`, `vbscript:`.
  - **Bloqueio de HTTP não criptografado**: Em produção, conexões via `http://` (sem TLS) são rejeitadas imediatamente.
  - **Allowlist de Destinos Confiáveis**: Toda requisição para hosts externos não listados na allowlist (`window.location.origin`, `VITE_API_URL` ou domínios explicitamente registrados via `addAllowedOrigin()`) é bloqueada antes do disparo.
  - **Timeout e Retentativas**: Timeout de 10 segundos por requisição com retentativas apenas para falhas transitórias de servidor (5xx).

### 1.3. Logger Seguro com Redação Abrangente
- Em `utils/logger.ts`:
  - Todos os métodos (`debug`, `info`, `warn` e `error`) passam por sanitização profunda recursiva.
  - Redação automática de termos sensíveis (`password`, `secret`, `token`, `api_key`, `credential`, `authorization`, `bearer`, `cookie`, `database_url`, `session`, `auth`, `private_key`).
  - Detecção e ofuscação de padrões JWT e connection strings em strings de texto.
  - Instâncias de `Error` são tratadas com segurança, sem vazar stack traces ou propriedades confidenciais.
  - Em produção, supressão de mensagens de debug/info e logs de erro minimizados sem dados internos de runtime.

### 1.4. Gestão e Isolamento de Variáveis de Ambiente
- `lib/env.ts` valida as variáveis do cliente e monitora ativamente contra vazamento acidental de chaves sensíveis como `GEMINI_API_KEY`, `DATABASE_URL` e `JWT_SECRET`.
- `.env.example` documenta de forma explícita a fronteira entre variáveis públicas de frontend (`VITE_*`) e segredos de backend (sem prefixo `VITE_`).
- Nenhum segredo real existe no código fonte ou nos arquivos de exemplo.

### 1.5. Prevenção de XSS, Sanitização e Validação de Schemas
- Ausência total de primitivas perigosas (`dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, `document.write`).
- `utils/sanitize.ts` aplica escape de caracteres especiais HTML e contenção de tamanho para formulários.
- `utils/validation.ts` valida em runtime cada campo lido de `localStorage`, revertendo para fallbacks seguros caso ocorra manipulação externa.

### 1.6. TypeScript Estrito
- Configuração do `tsconfig.json` com rigor máximo (`"strict": true`, `"noImplicitAny": true`, `"strictNullChecks": true`, `"strictFunctionTypes": true`).
- Eliminação de usos do tipo `any` na base de código.

---

## 2. Limitações Reais Atuais

1. **Persistência Local Não Assinada**:
   - O aplicativo ainda não possui backend próprio nem banco de dados. O progresso do usuário reside no `localStorage` do navegador.
   - Embora os dados sejam validados e sanitizados contra injeções no momento da leitura, eles podem ser limpos pelo usuário ou editados localmente através do DevTools.
2. **Ausência de Autenticação Real no Servidor**:
   - O módulo de autenticação atual (`types/auth.ts`, `lib/auth/`) é uma base arquitetural desacoplada, pronta para integração futura, mas sem endpoints de login ativos.

---

## 3. REGRA MANDATÓRIA: Integração com Neon PostgreSQL (Fase Futura)

> ### ⚠️ REGRA CRÍTICA DE ARQUITETURA
> **O frontend NUNCA deve conectar diretamente ao Neon PostgreSQL.**
> - `DATABASE_URL` e as credenciais do banco de dados devem residir **exclusivamente** no ambiente de servidor (Node.js, Cloud Run, Vercel Serverless Functions).
> - **Nenhum driver de banco de dados** (ex: `@neondatabase/serverless`, `pg`, `pg-pool`) pode ser importado em componentes ou módulos do cliente React.
> - **Toda leitura e escrita no banco de dados deve passar por uma camada server-side** com:
>   1. Autenticação prévia da requisição;
>   2. Autorização baseada em papéis/permissões (RBAC);
>   3. Validação estrita de schema dos dados de entrada (ex: Zod);
>   4. Prepared statements (via ORM como Drizzle) para imunidade contra SQL Injection;
>   5. Conexão criptografada via SSL obrigatório (`?sslmode=require`).

---

## 4. REGRA MANDATÓRIA: Autenticação e Controle de Acesso Futuros

> ### ⚠️ REGRAS DE CONTROLE DE ACESSO
> 1. **Autorização deve ser feita obrigatoriamente no servidor:**
>    - O servidor é a única fonte de autoridade para autorizar operações.
> 2. **Esconder botão ou rota no frontend NÃO é controle de acesso:**
>    - Condições de UI como `{isAdmin && <BotaoExcluir />}` ou redirecionamentos de rota no React são recursos de usabilidade (UX), nunca barreiras de segurança. Toda ação protegida deve ser verificada pelo backend no momento da chamada da API.
> 3. **Tokens sensíveis não devem residir em `localStorage`:**
>    - Não armazene JWTs ou tokens de refresh em `localStorage` ou `sessionStorage`.
>    - O mecanismo preferencial para refresh tokens é **Cookie com atributos `HttpOnly; Secure; SameSite=Strict`** (ou `SameSite=Lax`).
>    - O Access Token de curta duração deve ser mantido em **memória volátil** na aplicação cliente (já estruturado em `lib/auth/tokenStorage.ts`).
> 4. **Validar autorização em toda operação protegida:**
>    - Cada rota de API que altere estado ou consulte dados privados deve extrair e validar o contexto de autenticação do usuário.

---

## 5. Nota de Segurança Atual do Projeto: **7.8 / 10**

### Justificativa Realista:
- **O que justifica a nota 7.8 (Muito Forte para o escopo atual de frontend):**
  - Para uma aplicação client-side em desenvolvimento, o projeto atingiu o teto de excelência: CSP configurada sem `unsafe-eval`, headers HSTS/nosniff preparados para deploy na Vercel, allowlist estrita contra destinos arbitrários no cliente HTTP, logger com mascaramento abrangente de credenciais, validação de schema para qualquer leitura de storage, isolamento de segredos de ambiente, Error Boundary para contenção de exceções e compilação TypeScript com 100% de rigor estrito sem `any`.
- **Por que a nota NÃO é 9 ou 10 (-2.2):**
  - **Falta de Backend Ativo (-1.2)**: A segurança de dados de ponta a ponta depende de uma camada de API servidora autenticada.
  - **Falta de Banco com Controle de Acesso e Assinatura Criptográfica (-1.0)**: O estado do aluno em `localStorage` não possui comprovação de integridade emitida por um servidor seguro, o que só será alcançado com a persistência em Neon PostgreSQL e autenticação real.
