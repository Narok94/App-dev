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
  tagline: 'Descubra a fundação da Web',
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
    subtitle: 'A fundação de toda a internet explicada de forma simples e direta',
    estimatedMinutes: 3,
    totalXp: 35,
    steps: [
      {
        id: 'step-1-1-concept',
        type: 'concept',
        title: 'O Alicerce da Web',
        conceptText:
          'Toda vez que você acessa um site pelo celular ou computador, seu navegador (como o Chrome ou Safari) está lendo um arquivo escrito em HTML.\n\nImagine que construir um site é como erguer uma edificação: o HTML é a alvenaria, as vigas e paredes estruturais. Ele diz exatamente o que cada elemento é — se aquilo é um título, um parágrafo de texto, uma imagem ou um botão de ação.',
        codeSnippet: `<h1>Minha Primeira Página</h1>\n<p>Olá! Este é um parágrafo estruturado com HTML.</p>`,
        tatuTip:
          'O HTML não se preocupa com cores chamativas ou animações por enquanto. A missão dele é dar estrutura e sentido semântico ao conteúdo!',
        xpReward: 10,
      },
      {
        id: 'step-1-1-quiz',
        type: 'multiple_choice',
        title: 'Missão: O Papel do HTML',
        question: 'Qual é a função primordial do HTML ao criar uma página na web?',
        options: [
          {
            id: 'opt-a',
            text: 'Definir a estrutura e o conteúdo da página, organizando textos, títulos e imagens.',
            isCorrect: true,
            explanation:
              'Exato! O HTML é o alicerce fundamental que dá estrutura e significado a todo o conteúdo.',
          },
          {
            id: 'opt-b',
            text: 'Aplicar degradês, animações 3D e efeitos sonoros de fundo.',
            isCorrect: false,
            explanation:
              'Cores, degradês e efeitos visuais são atribuições do CSS, e não do HTML.',
          },
          {
            id: 'opt-c',
            text: 'Conectar fisicamente os cabos de rede e o sinal Wi-Fi do computador.',
            isCorrect: false,
            explanation:
              'Isso pertence à camada de infraestrutura de hardware e telecomunicações.',
          },
          {
            id: 'opt-d',
            text: 'Executar inteligências artificiais e processamento pesado no servidor.',
            isCorrect: false,
            explanation:
              'Cálculos lógicos dinâmicos pertencem a linguagens como JavaScript, Python ou Go.',
          },
        ],
        correctOptionId: 'opt-a',
        explanationOnCorrect:
          'Missão cumprida com perfeição! Você dominou o conceito: o HTML é o esqueleto que sustenta o conteúdo web.',
        explanationOnIncorrect:
          'Lembre-se da analogia: o HTML é a alvenaria que estrutura tudo, enquanto o CSS estiliza e o JS anima.',
        xpReward: 15,
      },
      {
        id: 'step-1-1-tf',
        type: 'true_false',
        title: 'Desafio Rápido: Verdadeiro ou Falso',
        question: 'O HTML é responsável por definir as cores e os tamanhos das fontes de uma página web.',
        isTrue: false,
        options: [
          {
            id: 'opt-v',
            text: 'Verdadeiro',
            isCorrect: false,
            explanation:
              'Incorreto. A estilização visual (cores, tamanhos de fontes, margens) é responsabilidade do CSS!',
          },
          {
            id: 'opt-f',
            text: 'Falso',
            isCorrect: true,
            explanation:
              'Correto! O HTML cuida puramente da estrutura e semântica; o CSS é quem define o estilo visual.',
          },
        ],
        correctOptionId: 'opt-f',
        explanationOnCorrect:
          'Perfeito! Você discerniu com clareza o limite entre marcação de conteúdo (HTML) e estilização visual (CSS).',
        explanationOnIncorrect:
          'Atenção à regra de ouro: HTML cuida do esqueleto/conteúdo, enquanto CSS cuida da maquiagem e estilos.',
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
    subtitle: 'Compreenda a sintaxe universal de abertura, conteúdo e fechamento',
    estimatedMinutes: 3,
    totalXp: 40,
    steps: [
      {
        id: 'step-1-2-concept',
        type: 'concept',
        title: 'Como as Tags São Construídas',
        conceptText:
          'HTML significa "HyperText Markup Language" (Linguagem de Marcação de Hipertexto).\n\nEssa marcação ocorre através de TAGS (etiquetas). As tags são envolvidas pelos caracteres < e >.\n\nA regra padrão da anatomia web é simples:\n1. Tag de abertura: <tag>\n2. Conteúdo textual no meio\n3. Tag de fechamento com barra: </tag>',
        codeSnippet: `<!-- Tag de abertura: <p> -->\n<!-- Tag de fechamento: </p> -->\n<p>Eu sou o texto dentro do parágrafo!</p>`,
        tatuTip:
          'A barra inclinada "/" no fechamento é crucial. É ela que comunica ao navegador exatamente onde o elemento termina!',
        xpReward: 10,
      },
      {
        id: 'step-1-2-completion',
        type: 'code_completion',
        title: 'Preenchimento de Código: Fechamento de Tag',
        question: 'Complete a lacuna para fechar corretamente o parágrafo HTML:',
        codeSnippetWithBlank: `<p>Aprender programação no App-dev é incrível!<___>`,
        correctAnswer: '</p>',
        options: [
          {
            id: 'opt-comp-a',
            text: '</p>',
            isCorrect: true,
            explanation:
              'Excelente! A barra antes da letra p dentro dos sinais de menor e maior (</p>) é o padrão oficial de fechamento.',
          },
          {
            id: 'opt-comp-b',
            text: '<p/>',
            isCorrect: false,
            explanation:
              'A barra no final é usada em tags auto-fecháveis, mas para fechar elementos de parágrafo com texto usa-se </p>.',
          },
          {
            id: 'opt-comp-c',
            text: '<fim p>',
            isCorrect: false,
            explanation:
              'O HTML não entende comandos em português dentro das tags; a sintaxe correta é </p>.',
          },
          {
            id: 'opt-comp-d',
            text: '<p>',
            isCorrect: false,
            explanation:
              '<p> é a tag de abertura. Sem a barra "/", o navegador não sabe que o parágrafo acabou.',
          },
        ],
        correctOptionId: 'opt-comp-a',
        explanationOnCorrect:
          'Código completado com sucesso! A sintaxe padrão de fechamento </tag> foi aplicada com rigor.',
        explanationOnIncorrect:
          'Lembre-se da barra inclinada "/" antes do nome da tag: </p>.',
        xpReward: 15,
      },
      {
        id: 'step-1-2-fix',
        type: 'code_fix',
        title: 'Correção de Bug: Identifique o Erro',
        question: 'Analise o trecho abaixo e identifique qual alternativa conserta o erro de sintaxe:',
        brokenCode: `<p>Meu primeiro parágrafo estruturado.<p>`,
        fixedCode: `<p>Meu primeiro parágrafo estruturado.</p>`,
        options: [
          {
            id: 'opt-fix-a',
            text: 'Substituir a segunda tag <p> por </p> para fechar o elemento.',
            isCorrect: true,
            explanation:
              'Exatamente! Havia duas tags de abertura <p> em vez de uma de abertura e uma de fechamento </p>.',
          },
          {
            id: 'opt-fix-b',
            text: 'Apagar o texto e deixar somente a tag sem nada dentro.',
            isCorrect: false,
            explanation:
              'O texto é o conteúdo do elemento, o erro está na sintaxe da tag final.',
          },
          {
            id: 'opt-fix-c',
            text: 'Colocar parênteses ao redor das tags: (<p>).',
            isCorrect: false,
            explanation:
              'Tags HTML utilizam exclusivamente sinais de menor e maior (< e >).',
          },
        ],
        correctOptionId: 'opt-fix-a',
        explanationOnCorrect:
          'Bug corrigido como um mestre! Você identificou a ausência da barra de fechamento e saneou o código.',
        explanationOnIncorrect:
          'Olhe atentamente para o final da linha: a tag está escrita como <p> em vez de </p>.',
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
    subtitle: 'Construa seu primeiro documento vivo combinando títulos e parágrafos',
    estimatedMinutes: 3,
    totalXp: 35,
    steps: [
      {
        id: 'step-1-3-concept',
        type: 'concept',
        title: 'A Dupla Essencial: Títulos e Parágrafos',
        conceptText:
          'No desenvolvimento web, a tag <h1> representa o título principal do documento (Heading 1) — aquele de maior hierarquia e destaque.\n\nJá a tag <p> representa o corpo de texto (Paragraph).\n\nQuando combinados, eles criam a forma mais clássica e respeitada da programação: o rito de passagem do "Olá, Mundo!".',
        codeSnippet: `<h1>Olá, Mundo!</h1>\n<p>Bem-vindo à minha jornada como desenvolvedor web.</p>`,
        tatuTip:
          'Dica de boas práticas: em uma página bem estruturada, use apenas um <h1> principal para identificar o assunto central!',
        xpReward: 10,
      },
      {
        id: 'step-1-3-quiz',
        type: 'multiple_choice',
        title: 'Missão: Hierarquia de Títulos',
        question: 'Qual é a tag recomendada para o título principal e de maior peso visual no HTML?',
        options: [
          {
            id: 'opt-h1',
            text: '<h1>',
            isCorrect: true,
            explanation:
              'Perfeito! O <h1> é o nível superior de títulos na hierarquia semântica do HTML.',
          },
          {
            id: 'opt-title',
            text: '<title-big>',
            isCorrect: false,
            explanation:
              'Não existe a tag <title-big> na especificação do HTML padrão.',
          },
          {
            id: 'opt-bold',
            text: '<b>',
            isCorrect: false,
            explanation:
              'A tag <b> apenas deixa o texto em negrito, mas não possui o peso semântico de um título <h1>.',
          },
          {
            id: 'opt-header',
            text: '<headline>',
            isCorrect: false,
            explanation:
              'A tag padrão para cabeçalhos de título é <h1> até <h6>.',
          },
        ],
        correctOptionId: 'opt-h1',
        explanationOnCorrect:
          'Excelente escolha! <h1> é a tag canônica para o título mais importante do seu documento.',
        explanationOnIncorrect:
          'Pense no número 1 como a maior prioridade de cabeçalho: <h1>.',
        xpReward: 15,
      },
      {
        id: 'step-1-3-tf',
        type: 'true_false',
        title: 'Desafio Rápido: Exceções de Fechamento',
        question: 'Todas as tags no HTML exigem obrigatoriamente uma tag de fechamento correspondente com </tag>.',
        isTrue: false,
        options: [
          {
            id: 'opt-tf-v',
            text: 'Verdadeiro',
            isCorrect: false,
            explanation:
              'Incorreto! Existem tags chamadas "void" ou "auto-fecháveis" que não possuem conteúdo de texto, como <img> e <br>.',
          },
          {
            id: 'opt-tf-f',
            text: 'Falso',
            isCorrect: true,
            explanation:
              'Correto! Tags como <img> (imagens) e <input> (campos) não têm fechamento </tag>, pois são elementos vazios.',
          },
        ],
        correctOptionId: 'opt-tf-f',
        explanationOnCorrect:
          'Conhecimento avançado conquistado! Você já sabe que existem tags de par fechado e tags auto-fecháveis.',
        explanationOnIncorrect:
          'Lembre-se de elementos como imagens ou quebras de linha: eles não precisam de </tag> de fechamento!',
        xpReward: 10,
      },
    ],
  },
};
