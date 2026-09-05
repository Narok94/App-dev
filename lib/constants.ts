import { ArchitectureModule } from '@/types';

export const APP_CONFIG = {
  name: 'Base Architecture',
  version: '1.0.0',
  description: 'Clean, modular, and scalable software architecture with Next.js, React, TypeScript, and Tailwind CSS.',
} as const;

export const PROJECT_FOLDERS: ArchitectureModule[] = [
  {
    id: 'app',
    name: 'App Router (/app)',
    path: '/app',
    purpose: 'Estrutura principal de rotas, layouts raiz, páginas e provedores globais segundo padrão Next.js App Router.',
    status: 'configured',
    category: 'core',
  },
  {
    id: 'components',
    name: 'Componentes Compartilhados (/components)',
    path: '/components',
    purpose: 'Componentes de UI agnósticos de domínio (botões, cards, diálogos, layouts compartilhados).',
    status: 'configured',
    category: 'presentation',
  },
  {
    id: 'features',
    name: 'Módulos de Negócio (/features)',
    path: '/features',
    purpose: 'Arquitetura modular orientada a domínio (Domain-Driven Design). Cada feature encapsula seus próprios componentes, hooks e tipos.',
    status: 'ready_for_extension',
    category: 'domain',
  },
  {
    id: 'hooks',
    name: 'Custom Hooks (/hooks)',
    path: '/hooks',
    purpose: 'Hooks React reutilizáveis transversais (ex: conectividade de rede, ciclo de vida de PWA, estados locais).',
    status: 'configured',
    category: 'core',
  },
  {
    id: 'lib',
    name: 'Bibliotecas e Conectores (/lib)',
    path: '/lib',
    purpose: 'Configuração de clientes de terceiros, abstração de conexões (banco de dados, PWA, SDKs externos).',
    status: 'configured',
    category: 'infrastructure',
  },
  {
    id: 'styles',
    name: 'Estilização Global (/styles)',
    path: '/styles',
    purpose: 'Configuração e importação de tokens globais de estilo, Tailwind CSS e propriedades customizadas.',
    status: 'configured',
    category: 'presentation',
  },
  {
    id: 'types',
    name: 'Definições de Tipos (/types)',
    path: '/types',
    purpose: 'Contratos TypeScript centralizados (modelos de entidades, esquemas de banco, PWA e eventos).',
    status: 'configured',
    category: 'core',
  },
  {
    id: 'utils',
    name: 'Utilitários Puros (/utils)',
    path: '/utils',
    purpose: 'Funções utilitárias puras sem estado (formatação de dados, união de classes CSS, validações).',
    status: 'configured',
    category: 'core',
  },
  {
    id: 'public',
    name: 'Arquivos Estáticos e PWA (/public)',
    path: '/public',
    purpose: 'Assets estáticos não compilados, Web App Manifest (manifest.json), Service Worker (sw.js) e ícones.',
    status: 'configured',
    category: 'infrastructure',
  },
];
