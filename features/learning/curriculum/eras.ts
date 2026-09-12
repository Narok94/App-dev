import { Era } from '@/types/learning';

/**
 * Roadmap de Eras do App-dev.
 * A primeira Era é a 'Era da Descoberta' (HTML).
 * As eras seguintes já possuem seus contratos estruturados para fácil expansão futura.
 */
export const ERAS_CATALOG: Era[] = [
  {
    id: 'era-descoberta',
    order: 1,
    title: 'Era da Descoberta',
    subtitle: 'HTML & Fundamentos da Web',
    description:
      'Aprenda a estrutura básica, as principais tags e como montar qualquer página na web.',
    technology: 'HTML5',
    iconName: 'compass',
    status: 'current',
    accentColor: '#C8F03D',
    moduleIds: [
      'html-mod-1',
      'html-mod-2',
      'html-mod-3',
      'html-mod-4',
      'html-mod-5',
      'html-mod-6',
      'html-mod-7',
      'html-mod-8',
      'html-mod-9',
      'html-mod-10',
      'html-mod-11',
      'html-mod-12',
    ],
  },
  {
    id: 'era-construcao',
    order: 2,
    title: 'Era da Construção — CSS',
    subtitle: 'CSS3, Layouts & Design Visual',
    description:
      'Aprenda a estilizar suas páginas com cores, espaçamentos, Flexbox e Grid.',
    technology: 'CSS3',
    iconName: 'palette',
    status: 'locked',
    accentColor: '#8B7CF6',
    moduleIds: [],
  },
  {
    id: 'era-interatividade',
    order: 3,
    title: 'Era da Interatividade',
    subtitle: 'JavaScript & Lógica Dinâmica',
    description:
      'Adicione interatividade às suas páginas com lógica, variáveis e eventos.',
    technology: 'JavaScript',
    iconName: 'zap',
    status: 'locked',
    accentColor: '#FACC15',
    moduleIds: [],
  },
  {
    id: 'era-versoes',
    order: 4,
    title: 'Era das Versões',
    subtitle: 'Git & Colaboração em Código',
    description:
      'Aprenda a versionar seu código com Git e a salvar seus projetos no GitHub.',
    technology: 'Git & GitHub',
    iconName: 'git-branch',
    status: 'locked',
    accentColor: '#FF6B4A',
    moduleIds: [],
  },
  {
    id: 'era-precisao',
    order: 5,
    title: 'Era da Precisão',
    subtitle: 'TypeScript & Arquitetura Segura',
    description:
      'Escreva código JavaScript mais seguro usando tipos estáticos e interfaces.',
    technology: 'TypeScript',
    iconName: 'shield',
    status: 'locked',
    accentColor: '#38BDF8',
    moduleIds: [],
  },
  {
    id: 'era-reinos',
    order: 6,
    title: 'Era dos Reinos',
    subtitle: 'React & Componentização',
    description:
      'Crie interfaces modernas e interativas dividindo a tela em componentes reutilizáveis.',
    technology: 'React',
    iconName: 'layers',
    status: 'locked',
    accentColor: '#34D0A6',
    moduleIds: [],
  },
];
