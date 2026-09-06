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
      'O início da jornada no App-dev. Domine a estrutura básica, tags essenciais e o esqueleto semântico que dá vida a qualquer página na web.',
    technology: 'HTML5',
    iconName: 'compass',
    status: 'current',
    accentColor: '#C8F03D',
    moduleIds: ['html-mod-1'],
  },
  {
    id: 'era-estilos',
    order: 2,
    title: 'Era dos Estilos',
    subtitle: 'CSS & Design Visual',
    description:
      'Pinte o mundo com cores, tipografia, espaçamentos, flexbox e animações fluidas.',
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
      'Dê inteligência e comportamento vivo às suas interfaces com manipulação de DOM e lógica orientada a eventos.',
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
      'Crie linhas do tempo, ramificações e domine a colaboração profissional em repositórios.',
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
      'Eleve seus códigos a outro nível com tipagem estática, interfaces e detecção precoce de erros.',
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
      'Construa ecossistemas completos com componentes reutilizáveis, hooks reativos e estados escaláveis.',
    technology: 'React',
    iconName: 'layers',
    status: 'locked',
    accentColor: '#34D0A6',
    moduleIds: [],
  },
];
