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
  tagline: 'Listas, div, span e organização',
  description:
    'Aprenda a criar listas ordenadas e não ordenadas, entender a diferença entre div e span e organizar o conteúdo sem exagerar nas divs.',
  status: 'locked',
  xpReward: 120,
  iconName: 'list',
  estimatedMinutes: 8,
  lessons: [
    {
      id: 'quest-html-6-1',
      title: 'Trabalhando com Listas: ul, ol e dl',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-6-2',
      title: 'Agrupando Elementos: div e span',
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
    title: 'Trabalhando com Listas: ul, ol e dl',
    subtitle: 'Estruture listas com marcadores, números e termos com definições',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-6-1-concept',
        type: 'concept',
        title: 'As principais formas de listar no HTML',
        conceptText:
          'Na web, listas são muito usadas em menus, itens de compras e passos de instruções:\n\n1. <ul> (Unordered List): lista com marcadores (bolinhas). A ordem não altera o sentido (ex: ingredientes de uma receita);\n2. <ol> (Ordered List): lista numerada (1, 2, 3...). A ordem faz diferença (ex: passos de um tutorial);\n3. <li> (List Item): é cada item individual dentro de <ul> ou <ol>.\n\nExiste também a <dl> (Description List), útil para glossários e dicionários: usa <dt> para o termo e <dd> para a explicação.',
        codeSnippet: `<!-- Lista Ordenada: Passo a Passo -->\n<ol>\n  <li>Abra o editor de código</li>\n  <li>Escreva a estrutura HTML</li>\n  <li>Abra a página no navegador</li>\n</ol>`,
        tatuTip:
          'Apenas elementos <li> podem ficar diretamente dentro de <ul> ou <ol>. Evite colocar textos ou outros elementos soltos sem uma tag <li>!',
        xpReward: 15,
      },
      {
        id: 'step-6-1-fix',
        type: 'code_fix',
        title: 'Corrija o item solto na lista',
        question: 'O código abaixo tem um texto solto diretamente dentro de <ul>. Como corrigir?',
        brokenCode: `<ul>\n  Café da manhã fresquinho\n  <li>Pão na chapa</li>\n</ul>`,
        fixedCode: `<ul>\n  <li>Café da manhã fresquinho</li>\n  <li>Pão na chapa</li>\n</ul>`,
        options: [
          {
            id: 'opt-fix-6-1-a',
            text: 'Envolver o texto solto na tag <li> para que seja um item de lista válido.',
            isCorrect: true,
            explanation:
              'Correto! Todo item dentro de <ul> ou <ol> precisa estar envolvido em uma tag <li>.',
          },
          {
            id: 'opt-fix-6-1-b',
            text: 'Mudar a tag <ul> para <paragraph>.',
            isCorrect: false,
            explanation:
              'A tag <paragraph> não existe no HTML; a tag para listas não ordenadas é <ul>.',
          },
          {
            id: 'opt-fix-6-1-c',
            text: 'Apagar a tag <li> do segundo item para ficarem iguais.',
            isCorrect: false,
            explanation:
              'Isso deixaria a lista inteira fora do padrão esperado pelo HTML.',
          },
        ],
        correctOptionId: 'opt-fix-6-1-a',
        explanationOnCorrect:
          'Boa! Dentro de <ul> ou <ol>, o conteúdo sempre fica dentro de <li>.',
        explanationOnIncorrect:
          'Lembre-se: os itens diretos de uma lista sempre usam a tag <li>.',
        xpReward: 20,
      },
      {
        id: 'step-6-1-ordering',
        type: 'ordering',
        title: 'Lista de termos e definições',
        question: 'Qual é a estrutura correta para associar um termo (HTML) à sua definição?',
        codeSnippetWithBlank: `<dl>\n  <___>HTML</___>\n  <___>Linguagem de Marcação de Hipertexto</___>\n</dl>`,
        options: [
          {
            id: 'opt-dt-dd',
            text: '<dt> para o termo e <dd> para a definição',
            isCorrect: true,
            explanation:
              'Perfeito! <dt> vem de Description Term e <dd> de Description Details.',
          },
          {
            id: 'opt-dd-dt',
            text: '<dd> para o termo e <dt> para a definição',
            isCorrect: false,
            explanation:
              'A ordem esperada é primeiro o termo (<dt>) e em seguida os detalhes (<dd>).',
          },
          {
            id: 'opt-li-li',
            text: 'Usar apenas <li> para ambos',
            isCorrect: false,
            explanation:
              'A tag <dl> trabalha com pares de <dt> e <dd>, não com <li>.',
          },
        ],
        correctOptionId: 'opt-dt-dd',
        explanationOnCorrect:
          'Muito bem! <dt> traz o termo e <dd> traz a descrição.',
        explanationOnIncorrect:
          'Dica prática: use <dt> para o termo e <dd> para a descrição.',
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
    title: 'Agrupando Elementos: div e span',
    subtitle: 'Entenda a diferença entre elementos de bloco e em linha',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-6-1-concept',
        type: 'concept',
        title: 'Tags genéricas: <div> e <span>',
        conceptText:
          'No HTML existem duas tags genéricas sem significado semântico específico:\n\n• <div>: elemento de BLOCO. Ocupa toda a largura da linha e quebra o texto para a linha de baixo. É útil para agrupar blocos que você quer posicionar ou estilizar.\n• <span>: elemento EM LINHA. Ocupa apenas o tamanho do seu conteúdo, sem quebrar a linha. É perfeito para estilizar uma palavra ou trecho dentro de um parágrafo.\n\nO hábito de usar <div> para tudo é bem comum no começo. Mas prefira usar tags com significado, como <nav>, <header>, <article> ou <button>, sempre que fizer sentido!',
        codeSnippet: `<div class="cartao-perfil">\n  <p>Status: <span class="destaque-online">Conectado</span></p>\n</div>`,
        tatuTip:
          'Antes de criar uma <div>, pense se existe uma tag mais específica para aquilo: menu de navegação (<nav>), cabeçalho (<header>), rodapé (<footer>) ou botão (<button>).',
        xpReward: 15,
      },
      {
        id: 'step-6-2-challenge',
        type: 'practical_challenge',
        title: 'Bloco vs Em linha',
        question: 'Você quer mudar a cor de apenas uma palavra dentro de um parágrafo. Qual tag em linha devemos usar?',
        codeSnippetWithBlank: `<p>Aprender no App-dev é uma experiência <___>transformadora</___> para sua carreira.</p>`,
        correctAnswer: 'span',
        options: [
          {
            id: 'opt-span-choice',
            text: '<span>',
            isCorrect: true,
            explanation:
              'Exato! <span> é um elemento em linha que não quebra o parágrafo, envolvendo apenas a palavra escolhida.',
          },
          {
            id: 'opt-div-choice',
            text: '<div>',
            isCorrect: false,
            explanation:
              'A tag <div> é um elemento de bloco e quebraria a linha no meio da frase.',
          },
          {
            id: 'opt-body-choice',
            text: '<body>',
            isCorrect: false,
            explanation:
              'O <body> representa o corpo da página inteira e não pode ficar dentro de um parágrafo.',
          },
        ],
        correctOptionId: 'opt-span-choice',
        explanationOnCorrect:
          'Perfeito! O <span> mantém a frase na mesma linha sem quebras indesejadas.',
        explanationOnIncorrect:
          'Para envolver uma palavra sem quebrar a linha do texto, use <span>.',
        xpReward: 20,
      },
      {
        id: 'step-6-2-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: significado da tag div',
        question: 'A tag <div> avisa aos mecanismos de busca que o conteúdo é um artigo de notícia oficial.',
        isTrue: false,
        options: [
          {
            id: 'opt-div-tf-v',
            text: 'Verdadeiro',
            isCorrect: false,
            explanation:
              'Na verdade não! A tag <div> não possui nenhum significado semântico embutido; ela é apenas um agrupador genérico.',
          },
          {
            id: 'opt-div-tf-f',
            text: 'Falso',
            isCorrect: true,
            explanation:
              'Correto! A tag <div> é neutra. Para indicar um artigo de notícia, a tag semântica recomendada é <article>.',
          },
        ],
        correctOptionId: 'opt-div-tf-f',
        explanationOnCorrect:
          'Exato! A tag <div> não tem significado semântico próprio, servindo apenas para agrupar elementos.',
        explanationOnIncorrect:
          'Lembre-se: <div> é um contêiner neutro para organização visual.',
        xpReward: 20,
      },
    ],
  },
};
