import { LearningModule, Quest } from '@/types/learning';

/**
 * Módulo 6: Organização
 * Pertencente à: Era da Descoberta (HTML)
 */
export const MODULE_06_ORGANIZACAO: LearningModule = {
  id: 'html-mod-6',
  eraId: 'era-descoberta',
  order: 6,
  title: 'Organização',
  tagline: 'Listas, agrupamentos e o fim da divite',
  description:
    'Aprenda a estruturar listas ordenadas (ol), não-ordenadas (ul) e de descrição (dl), aninhando elementos com precisão e usando div e span com sabedoria.',
  status: 'locked',
  xpReward: 120,
  iconName: 'list',
  estimatedMinutes: 8,
  lessons: [
    {
      id: 'quest-html-6-1',
      title: 'Listas com Propósito: ul, ol & dl',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-6-2',
      title: 'Agrupando com Sabedoria: div, span & Semântica',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
  ],
};

export const MODULE_06_QUESTS: Record<string, Quest> = {
  'quest-html-6-1': {
    id: 'quest-html-6-1',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-6',
    moduleOrder: 6,
    moduleTitle: 'Organização',
    title: 'Listas com Propósito: ul, ol & dl',
    subtitle: 'Estruture coleções de dados com ordem numérica, marcadores e glossários',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-6-1-concept',
        type: 'concept',
        title: 'As Três Formas de Listar no HTML',
        conceptText:
          'Na web, listas são a espinha dorsal de cardápios, menus de navegação, requisitos e tutoriais passo a passo:\n\n1. <ul> (Unordered List): lista com marcadores (bolinhas). A ordem dos itens não altera o resultado (ex: ingredientes de um bolo);\n2. <ol> (Ordered List): lista numerada (1, 2, 3...). A ordem sequencial é estritamente necessária (ex: passos de uma receita);\n3. <li> (List Item): é o elemento filho obrigatório de <ul> e <ol>.\n\nExiste também a elegante <dl> (Description List), feita para pares de chave e valor (como dicionários): usa <dt> para o termo e <dd> para a definição.',
        codeSnippet: `<!-- Lista Ordenada: Passo a Passo -->\n<ol>\n  <li>Abra o editor de código</li>\n  <li>Escreva o esqueleto HTML</li>\n  <li>Abra o arquivo no navegador</li>\n</ol>`,
        tatuTip:
          'Apenas elementos <li> podem ser filhos diretos de <ul> ou <ol>. Nunca coloque textos soltos ou parágrafos soltos direto dentro de <ul>!',
        xpReward: 15,
      },
      {
        id: 'step-6-1-fix',
        type: 'code_fix',
        title: 'Correção de Bug: Texto Solto na Lista',
        question: 'O código abaixo quebra as regras de validação do HTML ao colocar texto solto dentro de <ul>. Como consertar?',
        brokenCode: `<ul>\n  Café da manhã fresquinho\n  <li>Pão na chapa</li>\n</ul>`,
        fixedCode: `<ul>\n  <li>Café da manhã fresquinho</li>\n  <li>Pão na chapa</li>\n</ul>`,
        options: [
          {
            id: 'opt-fix-6-1-a',
            text: 'Envolver a linha solta dentro de sua própria tag <li> para que seja um item de lista válido.',
            isCorrect: true,
            explanation:
              'Correto! Todo e qualquer conteúdo direto dentro de <ul> deve obrigatoriamente estar envolvido em <li>.',
          },
          {
            id: 'opt-fix-6-1-b',
            text: 'Mudar a tag <ul> para <paragraph>.',
            isCorrect: false,
            explanation:
              '<paragraph> não existe no HTML padrão; o elemento de lista é <ul>.',
          },
          {
            id: 'opt-fix-6-1-c',
            text: 'Apagar a tag <li> do segundo item para ficarem iguais.',
            isCorrect: false,
            explanation:
              'Isso violaria ainda mais as regras do HTML para listas.',
          },
        ],
        correctOptionId: 'opt-fix-6-1-a',
        explanationOnCorrect:
          'Lista padronizada e válida! Cada item agora possui seu devido contêiner <li>.',
        explanationOnIncorrect:
          'Regra universal: filhos diretos de <ul> ou <ol> devem ser sempre <li>.',
        xpReward: 20,
      },
      {
        id: 'step-6-1-ordering',
        type: 'ordering',
        title: 'Ordenação de Código: Lista de Definições',
        question: 'Qual é a estrutura correta para associar um termo (HTML) à sua definição (Linguagem de Marcação)?',
        codeSnippetWithBlank: `<dl>\n  <___>HTML</___>\n  <___>Linguagem de Marcação de Hipertexto</___>\n</dl>`,
        options: [
          {
            id: 'opt-dt-dd',
            text: '<dt> para o termo e <dd> para a definição',
            isCorrect: true,
            explanation:
              'Perfeito! <dt> significa "Description Term" e <dd> significa "Description Details".',
          },
          {
            id: 'opt-dd-dt',
            text: '<dd> para o termo e <dt> para a definição',
            isCorrect: false,
            explanation:
              'A ordem canônica é primeiro o termo (<dt>) e depois seus detalhes (<dd>).',
          },
          {
            id: 'opt-li-li',
            text: 'Usar apenas <li> simples para ambos',
            isCorrect: false,
            explanation:
              '<dl> exige <dt> e <dd>, e não <li>.',
          },
        ],
        correctOptionId: 'opt-dt-dd',
        explanationOnCorrect:
          'Glossário semântico construído com distinção! <dt> e <dd> formam o par perfeito de vocabulário.',
        explanationOnIncorrect:
          'Lembre-se: T de Termo (<dt>) e D de Descrição (<dd>).',
        xpReward: 20,
      },
    ],
  },

  'quest-html-6-2': {
    id: 'quest-html-6-2',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-6',
    moduleOrder: 6,
    moduleTitle: 'Organização',
    title: 'Agrupando com Sabedoria: div, span & Semântica',
    subtitle: 'Entenda containers genéricos de bloco e em linha sem cair na armadilha da "divite"',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-6-1-concept',
        type: 'concept',
        title: 'Os Curingas da Web: <div> e <span>',
        conceptText:
          'No HTML existem dois elementos genéricos (curingas) sem nenhum significado semântico embutido:\n\n• <div> (Division): elemento de nível de BLOCO (block-level). Ele ocupa 100% da largura da linha e quebra o fluxo para a linha de baixo. É útil para agrupar pedaços de layout para o CSS estilizar.\n• <span>: elemento EM LINHA (inline). Ele ocupa apenas a largura exata do seu texto sem quebrar linha. É ideal para destacar uma palavra ou frase no meio de um parágrafo.\n\nA "Divite" é uma doença comum entre iniciantes: usar <div> para tudo (em vez de <nav>, <header>, <article>, <button>). Use divs apenas quando nenhuma tag semântica fizer sentido!',
        codeSnippet: `<div class="cartao-perfil">\n  <p>Status: <span class="destaque-online">Conectado</span></p>\n</div>`,
        tatuTip:
          'Antes de digitar uma <div>, pergunte a si mesmo: "Isso é um menu? É um artigo? É um rodapé?". Se for, use a tag semântica específica!',
        xpReward: 15,
      },
      {
        id: 'step-6-2-challenge',
        type: 'practical_challenge',
        title: 'Desafio Prático: Bloco vs Em Linha',
        question: 'Você deseja destacar com uma cor diferente uma única palavra no meio de um parágrafo longo de texto. Qual tag genérica em linha deve envolver essa palavra?',
        codeSnippetWithBlank: `<p>Aprender no App-dev é uma experiência <___>transformadora</___> para sua carreira.</p>`,
        correctAnswer: 'span',
        options: [
          {
            id: 'opt-span-choice',
            text: '<span>',
            isCorrect: true,
            explanation:
              'Exato! <span> é um contêiner inline que não quebra a linha do parágrafo, abraçando apenas a palavra desejada.',
          },
          {
            id: 'opt-div-choice',
            text: '<div>',
            isCorrect: false,
            explanation:
              'A tag <div> é um elemento de bloco e quebraria a linha no meio da frase, arruinando a leitura do parágrafo.',
          },
          {
            id: 'opt-body-choice',
            text: '<body>',
            isCorrect: false,
            explanation:
              'O <body> envolve toda a página e nunca pode ser aninhado dentro de um parágrafo.',
          },
        ],
        correctOptionId: 'opt-span-choice',
        explanationOnCorrect:
          'Decisão cirúrgica! <span> preserva o fluxo natural da linha sem quebras bruscas.',
        explanationOnIncorrect:
          'Para estilizar trechos dentro de uma linha contínua de texto, use <span>.',
        xpReward: 20,
      },
      {
        id: 'step-6-2-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: Significado Semântico de uma Div',
        question: 'A tag <div> comunica para os mecanismos de busca do Google e leitores de tela que aquele bloco de conteúdo é um artigo de notícia oficial.',
        isTrue: false,
        options: [
          {
            id: 'opt-div-tf-v',
            text: 'Verdadeiro',
            isCorrect: false,
            explanation:
              'Incorreto! A tag <div> não possui nenhum valor semântico próprio; ela é um contêiner totalmente mudo.',
          },
          {
            id: 'opt-div-tf-f',
            text: 'Falso',
            isCorrect: true,
            explanation:
              'Correto! A tag <div> é 100% genérica. Para indicar um artigo de notícia, devemos usar a tag semântica <article>.',
          },
        ],
        correctOptionId: 'opt-div-tf-f',
        explanationOnCorrect:
          'Verdade absoluta absorvida! Divs servem para estilização genérica, nunca para comunicar semântica.',
        explanationOnIncorrect:
          'Lembre-se: divs são transparentes e neutras para o navegador.',
        xpReward: 20,
      },
    ],
  },
};
