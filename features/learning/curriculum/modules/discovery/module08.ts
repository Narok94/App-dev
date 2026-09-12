import { LearningModule, Quest } from '@/types/learning';

/**
 * Módulo 8: Dados e Tabelas
 * Pertencente à: Era da Descoberta (HTML)
 */
export const MODULE_08_DADOS_TABELAS: LearningModule = {
  id: 'html-mod-8',
  eraId: 'era-descoberta',
  order: 8,
  title: 'Dados e Tabelas',
  tagline: 'Criando tabelas claras e acessíveis',
  description:
    'Aprenda a criar tabelas usando table, caption, thead, tbody, tr, th, td e a tornar os dados fáceis de navegar.',
  status: 'locked',
  xpReward: 130,
  iconName: 'table',
  estimatedMinutes: 9,
  lessons: [
    {
      id: 'quest-html-8-1',
      title: 'Montando Tabelas: tr, th e td',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-8-2',
      title: 'Tabelas Acessíveis: thead, tbody e scope',
      durationMinutes: 5,
      isCompleted: false,
      type: 'quest',
    },
  ],
};

export const MODULE_08_QUESTS: Record<string, Quest> = {
  'quest-html-8-1': {
    id: 'quest-html-8-1',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-8',
    moduleOrder: 8,
    moduleTitle: 'Dados e Tabelas',
    title: 'Montando Tabelas: tr, th e td',
    subtitle: 'Aprenda a organizar linhas e células para mostrar dados',
    estimatedMinutes: 4,
    totalXp: 60,
    steps: [
      {
        id: 'step-8-1-concept',
        type: 'concept',
        title: 'Como tabelas são construídas',
        conceptText:
          'No HTML, tabelas são montadas linha por linha, de cima para baixo:\n\n• <table>: o contêiner geral da tabela;\n• <caption>: o título ou resumo da tabela (ótimo para acessibilidade);\n• <tr> (Table Row): cria uma linha horizontal;\n• <th> (Table Header): célula de cabeçalho (o nome da coluna ou da linha). Por padrão, fica em negrito e centralizada;\n• <td> (Table Data): célula comum com o dado real.',
        codeSnippet: `<table>\n  <caption>Preços dos Planos</caption>\n  <tr>\n    <th>Plano</th>\n    <th>Preço Mensal</th>\n  </tr>\n  <tr>\n    <td>Iniciante</td>\n    <td>Grátis</td>\n  </tr>\n</table>`,
        tatuTip:
          'Evite usar <table> para fazer layout da página. Tabelas servem exclusivamente para dados organizados em linhas e colunas (como planilhas).',
        xpReward: 15,
      },
      {
        id: 'step-8-1-completion',
        type: 'code_completion',
        title: 'Criando uma linha',
        question: 'Qual tag cria a linha horizontal que agrupa as células da tabela?',
        codeSnippetWithBlank: `<table>\n  <___>\n    <th>Produto</th>\n    <th>Estoque</th>\n  </___>\n</table>`,
        correctAnswer: 'tr',
        options: [
          {
            id: 'opt-comp-tr',
            text: '<tr>',
            isCorrect: true,
            explanation:
              'Correto! <tr> vem de Table Row e define uma linha horizontal na tabela.',
          },
          {
            id: 'opt-comp-row',
            text: '<row>',
            isCorrect: false,
            explanation:
              'A tag <row> não existe no HTML padrão.',
          },
          {
            id: 'opt-comp-line',
            text: '<line>',
            isCorrect: false,
            explanation:
              '<line> é usado em SVG para desenhar linhas, não no HTML tabular.',
          },
        ],
        correctOptionId: 'opt-comp-tr',
        explanationOnCorrect:
          'Muito bem! A tag <tr> cria a linha horizontal da tabela.',
        explanationOnIncorrect:
          'Para criar uma linha na tabela, usamos a tag <tr>.',
        xpReward: 20,
      },
      {
        id: 'step-8-1-fix',
        type: 'code_fix',
        title: 'Corrigindo a célula de cabeçalho',
        question: 'A primeira linha serve como título das colunas, mas usou <td>. Qual é a tag correta para cabeçalhos?',
        brokenCode: `<tr>\n  <td>Nome do Aluno</td>\n  <td>Nota Final</td>\n</tr>`,
        fixedCode: `<tr>\n  <th>Nome do Aluno</th>\n  <th>Nota Final</th>\n</tr>`,
        options: [
          {
            id: 'opt-fix-8-1-a',
            text: 'Substituir as células <td> por <th> na linha de cabeçalho.',
            isCorrect: true,
            explanation:
              'Exato! Células que dão nome às colunas ou linhas devem usar <th> (Table Header).',
          },
          {
            id: 'opt-fix-8-1-b',
            text: 'Colocar um <h1> dentro de cada <td>.',
            isCorrect: false,
            explanation:
              'Colocar <h1> dentro de células de tabela quebra a organização de títulos da página.',
          },
          {
            id: 'opt-fix-8-1-c',
            text: 'Apagar a linha inteira.',
            isCorrect: false,
            explanation:
              'Os títulos das colunas são essenciais para entender os dados.',
          },
        ],
        correctOptionId: 'opt-fix-8-1-a',
        explanationOnCorrect:
          'Boa! Células que dão nome às colunas usam <th>.',
        explanationOnIncorrect:
          'Para títulos de colunas ou linhas, usamos <th>.',
        xpReward: 25,
      },
    ],
  },

  'quest-html-8-2': {
    id: 'quest-html-8-2',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-8',
    moduleOrder: 8,
    moduleTitle: 'Dados e Tabelas',
    title: 'Tabelas Acessíveis: thead, tbody e scope',
    subtitle: 'Organize cabeçalho, corpo e rodapé com thead, tbody e scope',
    estimatedMinutes: 5,
    totalXp: 60,
    steps: [
      {
        id: 'step-8-2-concept',
        type: 'concept',
        title: 'As três partes de uma tabela',
        conceptText:
          'Para tabelas mais completas e organizadas, dividimos o conteúdo em seções:\n\n1. <thead>: o cabeçalho, reunindo os nomes das colunas;\n2. <tbody>: o corpo da tabela, onde ficam as linhas com os dados;\n3. <tfoot>: o rodapé, ótimo para totais, médias ou resumos.\n\nAlém disso, usamos o atributo scope na tag <th>:\n• <th scope="col">: avisa que o cabeçalho se refere a toda a COLUNA abaixo dele.\n• <th scope="row">: avisa que o cabeçalho se refere a toda a LINHA ao lado dele.',
        codeSnippet: `<table>\n  <caption>Relatório Financeiro</caption>\n  <thead>\n    <tr>\n      <th scope="col">Mês</th>\n      <th scope="col">Faturamento</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">Janeiro</th>\n      <td>R$ 15.000</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <th scope="row">Total</th>\n      <td>R$ 15.000</td>\n    </tr>\n  </tfoot>\n</table>`,
        tatuTip:
          'Ao navegar com leitor de tela numa tabela com scope="col", a pessoa ouve o título da coluna antes de cada valor numérico. Isso facilita muito a leitura!',
        xpReward: 15,
      },
      {
        id: 'step-8-2-ordering',
        type: 'ordering',
        title: 'Ordem das seções da tabela',
        question: 'Qual é a ordem padrão recomendada para as três divisões da tabela?',
        codeSnippetWithBlank: `<table>\n  <___> ... </___>\n  <___> ... </___>\n  <___> ... </___>\n</table>`,
        options: [
          {
            id: 'opt-thead-tbody-tfoot',
            text: '<thead> (cabeçalho), <tbody> (dados) e <tfoot> (rodapé)',
            isCorrect: true,
            explanation:
              'Correto! Essa sequência segue o fluxo natural de leitura: títulos, dados e totais.',
          },
          {
            id: 'opt-tbody-thead-tfoot',
            text: '<tbody> primeiro, depois <thead> e por fim <tfoot>',
            isCorrect: false,
            explanation:
              'O <thead> vem antes do corpo da tabela para apresentar as colunas.',
          },
          {
            id: 'opt-tfoot-only',
            text: 'Usar apenas <tfoot> em todas as linhas',
            isCorrect: false,
            explanation:
              '<tfoot> é reservado para o rodapé final.',
          },
        ],
        correctOptionId: 'opt-thead-tbody-tfoot',
        explanationOnCorrect:
          'Muito bem! A ordem recomendada é <thead>, <tbody> e por fim <tfoot>.',
        explanationOnIncorrect:
          'Lembre-se da sequência lógica: thead -> tbody -> tfoot.',
        xpReward: 20,
      },
      {
        id: 'step-8-2-challenge',
        type: 'practical_challenge',
        title: 'Indicando o escopo com scope',
        question: 'Qual valor devemos colocar no atributo scope para indicar que um <th> é o título de uma coluna vertical?',
        codeSnippetWithBlank: `<thead>\n  <tr>\n    <th scope="___">Preço</th>\n  </tr>\n</thead>`,
        correctAnswer: 'col',
        options: [
          {
            id: 'opt-scope-col',
            text: 'col',
            isCorrect: true,
            explanation:
              'Perfeito! "col" avisa aos leitores de tela que este <th> dá título à coluna inteira.',
          },
          {
            id: 'opt-scope-row',
            text: 'row',
            isCorrect: false,
            explanation:
              '"row" é usado quando o cabeçalho se refere a uma linha horizontal.',
          },
          {
            id: 'opt-scope-all',
            text: 'all',
            isCorrect: false,
            explanation:
              'O valor "all" não existe para o atributo scope no HTML.',
          },
        ],
        correctOptionId: 'opt-scope-col',
        explanationOnCorrect:
          'Perfeito! Usar scope="col" ajuda os leitores de tela a identificar que o cabeçalho vale para toda a coluna.',
        explanationOnIncorrect:
          'Para colunas verticais usamos scope="col". Para linhas horizontais usamos scope="row".',
        xpReward: 25,
      },
    ],
  },
};
