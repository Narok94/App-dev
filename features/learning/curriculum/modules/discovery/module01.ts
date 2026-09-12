import { LearningModule, Quest } from '@/types/learning';

/**
 * Módulo Piloto: Módulo 1 — O Primeiro Contato
 * Pertencente à: Era da Descoberta (HTML)
 */
export const MODULE_01_PRIMEIRO_CONTATO: LearningModule = {
  id: 'html-mod-1',
  eraId: 'era-descoberta',
  order: 1,
  title: 'O Primeiro Contato',
  tagline: 'Dê seus primeiros passos na web',
  description:
    'Aprenda o que é HTML, como a web interpreta documentos e construa suas primeiras tags com abertura, conteúdo e fechamento.',
  status: 'current',
  xpReward: 100,
  iconName: 'flag',
  estimatedMinutes: 8,
  lessons: [
    {
      id: 'quest-html-1-1',
      title: 'O que é HTML?',
      durationMinutes: 3,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-1-2',
      title: 'A Anatomia de uma Tag',
      durationMinutes: 3,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-1-3',
      title: 'Seu Primeiro "Olá, Mundo!"',
      durationMinutes: 3,
      isCompleted: false,
      type: 'quest',
    },
  ],
};

/**
 * Quests do Módulo 1 com suporte aos novos tipos de etapas:
 * - concept
 * - multiple_choice
 * - true_false
 * - code_completion
 * - code_fix
 */
export const MODULE_01_QUESTS: Record<string, Quest> = {
  'quest-html-1-1': {
    id: 'quest-html-1-1',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-1',
    moduleOrder: 1,
    moduleTitle: 'O Primeiro Contato',
    title: 'O que é HTML?',
    subtitle: 'Entenda o que é HTML e como as páginas funcionam',
    estimatedMinutes: 3,
    totalXp: 35,
    steps: [
      {
        id: 'step-1-1-concept',
        type: 'concept',
        title: 'Como a web funciona por baixo dos panos',
        conceptText:
          'Sempre que você abre um site no celular ou no computador, seu navegador lê um arquivo HTML.\n\nPense no HTML como a estrutura de uma casa: as paredes, portas e janelas. Ele organiza o conteúdo da página e avisa o que é cada coisa: títulos, parágrafos de texto, imagens ou botões.',
        codeSnippet: `<h1>Minha Primeira Página</h1>\n<p>Olá! Este é um parágrafo estruturado com HTML.</p>`,
        tatuTip:
          'O HTML cuida apenas do conteúdo e da organização. Cores, fontes e estilos ficam para depois, com o CSS.',
        xpReward: 10,
      },
      {
        id: 'step-1-1-quiz',
        type: 'multiple_choice',
        title: 'Para que serve o HTML?',
        question: 'Qual é o papel principal do HTML em uma página da web?',
        options: [
          {
            id: 'opt-a',
            text: 'Definir a estrutura e o conteúdo da página, organizando textos, títulos e imagens.',
            isCorrect: true,
            explanation:
              'Exato! O HTML organiza todo o conteúdo e define o que aparece na página.',
          },
          {
            id: 'opt-b',
            text: 'Aplicar degradês, animações 3D e efeitos sonoros de fundo.',
            isCorrect: false,
            explanation:
              'Cores e efeitos visuais são tarefas do CSS, não do HTML.',
          },
          {
            id: 'opt-c',
            text: 'Conectar fisicamente os cabos de rede e o sinal Wi-Fi do computador.',
            isCorrect: false,
            explanation:
              'Isso faz parte da conexão de rede e do aparelho, não do código da página.',
          },
          {
            id: 'opt-d',
            text: 'Executar inteligências artificiais e processamento pesado no servidor.',
            isCorrect: false,
            explanation:
              'Lógica mais pesada fica para linguagens de programação no servidor ou scripts.',
          },
        ],
        correctOptionId: 'opt-a',
        explanationOnCorrect:
          'Na mosca! O HTML é a estrutura básica que organiza todo o conteúdo.',
        explanationOnIncorrect:
          'Lembre-se: o HTML cria a estrutura da página. Estilos e cores ficam para o CSS.',
        xpReward: 15,
      },
      {
        id: 'step-1-1-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso',
        question: 'O HTML é responsável por definir as cores e os tamanhos das fontes de uma página web.',
        isTrue: false,
        options: [
          {
            id: 'opt-v',
            text: 'Verdadeiro',
            isCorrect: false,
            explanation:
              'Na verdade não. Cores, fontes e espaçamentos são responsabilidade do CSS.',
          },
          {
            id: 'opt-f',
            text: 'Falso',
            isCorrect: true,
            explanation:
              'Isso mesmo! O HTML cuida da estrutura. Quem define cores e tamanhos é o CSS.',
          },
        ],
        correctOptionId: 'opt-f',
        explanationOnCorrect:
          'Muito bem! Guarde isso: HTML para estrutura, CSS para visual.',
        explanationOnIncorrect:
          'Dica rápida: HTML monta a estrutura, CSS cuida das cores e estilos.',
        xpReward: 10,
      },
    ],
  },

  'quest-html-1-2': {
    id: 'quest-html-1-2',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-1',
    moduleOrder: 1,
    moduleTitle: 'O Primeiro Contato',
    title: 'A Anatomia de uma Tag',
    subtitle: 'Entenda como funcionam as tags com abertura, conteúdo e fechamento',
    estimatedMinutes: 3,
    totalXp: 40,
    steps: [
      {
        id: 'step-1-2-concept',
        type: 'concept',
        title: 'Como funciona uma tag',
        conceptText:
          'No HTML, quase tudo é construído com tags.\n\nUma tag funciona como uma etiqueta com sinais de < e >. Quase sempre você usa um par:\n\n1. Tag de abertura: <p>\n2. Conteúdo no meio: seu texto\n3. Tag de fechamento com barra: </p>',
        codeSnippet: `<!-- Tag de abertura: <p> -->\n<!-- Tag de fechamento: </p> -->\n<p>Eu sou o texto dentro do parágrafo!</p>`,
        tatuTip:
          'A barra "/" na tag final avisa o navegador onde o texto ou elemento termina.',
        xpReward: 10,
      },
      {
        id: 'step-1-2-completion',
        type: 'code_completion',
        title: 'Complete a tag',
        question: 'Como fechar corretamente este parágrafo em HTML?',
        codeSnippetWithBlank: `<p>Aprender programação no App-dev é incrível!<___>`,
        correctAnswer: '</p>',
        options: [
          {
            id: 'opt-comp-a',
            text: '</p>',
            isCorrect: true,
            explanation:
              'Exato! A barra antes da letra p indica que o parágrafo terminou: </p>.',
          },
          {
            id: 'opt-comp-b',
            text: '<p/>',
            isCorrect: false,
            explanation:
              'Para parágrafos com texto no meio, a barra vem antes: </p>.',
          },
          {
            id: 'opt-comp-c',
            text: '<fim p>',
            isCorrect: false,
            explanation:
              'O HTML usa nomes de tags específicos em inglês, como </p>.',
          },
          {
            id: 'opt-comp-d',
            text: '<p>',
            isCorrect: false,
            explanation:
              'Sem a barra "/", o navegador acha que você está abrindo outro parágrafo.',
          },
        ],
        correctOptionId: 'opt-comp-a',
        explanationOnCorrect:
          'Boa! Você fechou o parágrafo certinho com </p>.',
        explanationOnIncorrect:
          'Lembre da barra antes do nome da tag para fechar: </p>.',
        xpReward: 15,
      },
      {
        id: 'step-1-2-fix',
        type: 'code_fix',
        title: 'Encontre o erro',
        question: 'O que precisa ser corrigido na linha abaixo?',
        brokenCode: `<p>Meu primeiro parágrafo estruturado.<p>`,
        fixedCode: `<p>Meu primeiro parágrafo estruturado.</p>`,
        options: [
          {
            id: 'opt-fix-a',
            text: 'Substituir a segunda tag <p> por </p> para fechar o elemento.',
            isCorrect: true,
            explanation:
              'Exatamente! Havia duas tags de abertura em vez de fechar a última com </p>.',
          },
          {
            id: 'opt-fix-b',
            text: 'Apagar o texto e deixar somente a tag sem nada dentro.',
            isCorrect: false,
            explanation:
              'O texto está certo. O problema é a tag no final.',
          },
          {
            id: 'opt-fix-c',
            text: 'Colocar parênteses ao redor das tags: (<p>).',
            isCorrect: false,
            explanation:
              'Tags HTML sempre usam < e >, sem parênteses.',
          },
        ],
        correctOptionId: 'opt-fix-a',
        explanationOnCorrect:
          'Mandou bem! Faltava só a barra para fechar a tag.',
        explanationOnIncorrect:
          'Dá uma olhada no finalzinho da linha: a tag precisa fechar com </p>.',
        xpReward: 15,
      },
    ],
  },

  'quest-html-1-3': {
    id: 'quest-html-1-3',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-1',
    moduleOrder: 1,
    moduleTitle: 'O Primeiro Contato',
    title: 'Seu Primeiro "Olá, Mundo!"',
    subtitle: 'Combine títulos e parágrafos para criar sua primeira estrutura',
    estimatedMinutes: 3,
    totalXp: 35,
    steps: [
      {
        id: 'step-1-3-concept',
        type: 'concept',
        title: 'Títulos e parágrafos',
        conceptText:
          'A tag <h1> serve para o título principal da página, aquele com mais destaque.\n\nJá a tag <p> serve para parágrafos comuns de texto.\n\nJuntando os dois, você já consegue criar seu primeiro exemplo clássico: o "Olá, Mundo!".',
        codeSnippet: `<h1>Olá, Mundo!</h1>\n<p>Bem-vindo à minha jornada como desenvolvedor web.</p>`,
        tatuTip:
          'Boa prática: procure usar apenas um <h1> por página, para deixar claro qual é o assunto principal.',
        xpReward: 10,
      },
      {
        id: 'step-1-3-quiz',
        type: 'multiple_choice',
        title: 'Título principal',
        question: 'Qual tag usamos para o título principal de uma página?',
        options: [
          {
            id: 'opt-h1',
            text: '<h1>',
            isCorrect: true,
            explanation:
              'Perfeito! <h1> é a tag usada para o título principal.',
          },
          {
            id: 'opt-title',
            text: '<title-big>',
            isCorrect: false,
            explanation:
              'Essa tag não existe no HTML.',
          },
          {
            id: 'opt-bold',
            text: '<b>',
            isCorrect: false,
            explanation:
              'A tag <b> só deixa o texto em negrito, não cria um título.',
          },
          {
            id: 'opt-header',
            text: '<headline>',
            isCorrect: false,
            explanation:
              'Para títulos, o HTML usa tags de <h1> a <h6>.',
          },
        ],
        correctOptionId: 'opt-h1',
        explanationOnCorrect:
          'Certinho! <h1> é a tag padrão para o título mais importante da página.',
        explanationOnIncorrect:
          'Pense no número 1 como a prioridade mais alta: <h1>.',
        xpReward: 15,
      },
      {
        id: 'step-1-3-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso',
        question: 'Todas as tags no HTML exigem obrigatoriamente uma tag de fechamento correspondente com </tag>.',
        isTrue: false,
        options: [
          {
            id: 'opt-tf-v',
            text: 'Verdadeiro',
            isCorrect: false,
            explanation:
              'Na verdade não! Algumas tags não precisam de fechamento, como imagens (<img>) ou quebras de linha (<br>).',
          },
          {
            id: 'opt-tf-f',
            text: 'Falso',
            isCorrect: true,
            explanation:
              'Isso mesmo! Algumas tags não têm texto no meio e não precisam de </tag>, como <img> e <input>.',
          },
        ],
        correctOptionId: 'opt-tf-f',
        explanationOnCorrect:
          'Muito bem! A maioria das tags fecha com </tag>, mas existem exceções como imagens e quebras de linha.',
        explanationOnIncorrect:
          'Algumas tags não precisam de fechamento, como <img> para imagens ou <br> para pular linha.',
        xpReward: 10,
      },
    ],
  },
};
