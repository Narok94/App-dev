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
  tagline: 'Apresentando informações tabulares com acessibilidade',
  description:
    'Aprenda a construir matrizes de dados acessíveis com table, caption, thead, tbody, tfoot, tr, th, td e o atributo essencial scope.',
  status: 'locked',
  xpReward: 130,
  iconName: 'table',
  estimatedMinutes: 9,
  lessons: [
    {
      id: 'quest-html-8-1',
      title: 'Anatomia da Tabela: tr, th & td',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-8-2',
      title: 'Tabelas Acessíveis: thead, tbody & scope',
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
    title: 'Anatomia da Tabela: tr, th & td',
    subtitle: 'Compreenda a matriz de linhas e células para exibir dados tabulares',
    estimatedMinutes: 4,
    totalXp: 60,
    steps: [
      {
        id: 'step-8-1-concept',
        type: 'concept',
        title: 'A Construção Linha por Linha',
        conceptText:
          'Tabelas em HTML são desenhadas sempre linha por linha, de cima para baixo:\n\n• <table>: o contêiner geral da tabela;\n• <caption>: a legenda ou título da tabela (fica no topo e informa ao usuário cego do que se trata a tabela antes de ele navegar por ela);\n• <tr> (Table Row): define uma linha horizontal inteira;\n• <th> (Table Header): célula especial de cabeçalho (título da coluna ou linha). O navegador a exibe em negrito e centralizada por padrão;\n• <td> (Table Data): célula comum de dado, contendo o valor real.',
        codeSnippet: `<table>\n  <caption>Tabela de Preços dos Planos</caption>\n  <tr>\n    <th>Plano</th>\n    <th>Preço Mensal</th>\n  </tr>\n  <tr>\n    <td>Iniciante</td>\n    <td>Grátis</td>\n  </tr>\n</table>`,
        tatuTip:
          'Nunca use <table> para montar o layout visual ou posicionar menus de um site. Tabelas existem única e exclusivamente para exibir dados bidimensionais (como uma planilha do Excel).',
        xpReward: 15,
      },
      {
        id: 'step-8-1-completion',
        type: 'code_completion',
        title: 'Completar Código: A Linha da Tabela',
        question: 'Qual tag cria a linha horizontal que envolve as células <th> ou <td> da tabela?',
        codeSnippetWithBlank: `<table>\n  <___>\n    <th>Produto</th>\n    <th>Estoque</th>\n  </___>\n</table>`,
        correctAnswer: 'tr',
        options: [
          {
            id: 'opt-comp-tr',
            text: '<tr>',
            isCorrect: true,
            explanation:
              'Correto! <tr> significa "Table Row" (linha da tabela) e é o elemento pai de todas as células horizontais.',
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
              '<line> é uma tag gráfica do SVG, não do HTML tabular.',
          },
        ],
        correctOptionId: 'opt-comp-tr',
        explanationOnCorrect:
          'Linha traçada com destreza! <tr> reúne as células daquela coordenada horizontal.',
        explanationOnIncorrect:
          'Abreviação essencial: Table Row -> <tr>.',
        xpReward: 20,
      },
      {
        id: 'step-8-1-fix',
        type: 'code_fix',
        title: 'Correção de Bug: Célula de Cabeçalho Errada',
        question: 'O desenvolvedor colocou dados comuns <td> na primeira linha que deveria ser de cabeçalhos de coluna. Corrija para a tag adequada:',
        brokenCode: `<tr>\n  <td>Nome do Aluno</td>\n  <td>Nota Final</td>\n</tr>`,
        fixedCode: `<tr>\n  <th>Nome do Aluno</th>\n  <th>Nota Final</th>\n</tr>`,
        options: [
          {
            id: 'opt-fix-8-1-a',
            text: 'Substituir as células <td> por <th> na linha de cabeçalho.',
            isCorrect: true,
            explanation:
              'Exato! Células que dão nome às colunas devem ser marcadas com <th> (Table Header) para fins semânticos e visuais.',
          },
          {
            id: 'opt-fix-8-1-b',
            text: 'Colocar um <h1> dentro de cada <td>.',
            isCorrect: false,
            explanation:
              'Colocar <h1> dentro de células de tabela quebra a hierarquia da página inteira.',
          },
          {
            id: 'opt-fix-8-1-c',
            text: 'Apagar a linha inteira.',
            isCorrect: false,
            explanation:
              'Os nomes das colunas são essenciais para entender os dados.',
          },
        ],
        correctOptionId: 'opt-fix-8-1-a',
        explanationOnCorrect:
          'Cabeçalho devidamente promovido a <th>! Clareza garantida para humanos e computadores.',
        explanationOnIncorrect:
          'Célula de título em tabela é <th> (Table Header).',
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
    title: 'Tabelas Acessíveis: thead, tbody & scope',
    subtitle: 'Eleve suas tabelas ao padrão de engenharia com thead, tbody, tfoot e escopo de cabeçalhos',
    estimatedMinutes: 5,
    totalXp: 60,
    steps: [
      {
        id: 'step-8-2-concept',
        type: 'concept',
        title: 'A Tríade Semântica da Tabela',
        conceptText:
          'Em sistemas profissionais, tabelas devem ser organizadas em três seções semânticas:\n\n1. <thead>: reúne a linha de cabeçalhos das colunas;\n2. <tbody>: reúne todas as linhas com os dados reais;\n3. <tfoot>: reúne a linha de resumo, totais ou médias no final.\n\nAlém disso, existe o atributo scope em tags <th>:\n• <th scope="col">: avisa ao leitor de tela que este cabeçalho se refere a toda a COLUNA vertical abaixo dele.\n• <th scope="row">: avisa que o cabeçalho se refere a toda a LINHA horizontal à sua direita.',
        codeSnippet: `<table>\n  <caption>Relatório Financeiro</caption>\n  <thead>\n    <tr>\n      <th scope="col">Mês</th>\n      <th scope="col">Faturamento</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">Janeiro</th>\n      <td>R$ 15.000</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <th scope="row">Total</th>\n      <td>R$ 15.000</td>\n    </tr>\n  </tfoot>\n</table>`,
        tatuTip:
          'Quando uma pessoa cega navega por uma tabela com scope="col", o leitor de tela lê o nome da coluna antes de cada valor numérico. Isso evita que ela se perca em tabelas gigantescas!',
        xpReward: 15,
      },
      {
        id: 'step-8-2-ordering',
        type: 'ordering',
        title: 'Ordenação de Código: Seções da Tabela',
        question: 'Qual é a sequência canônica recomendada para estruturar uma tabela completa com as três divisões?',
        codeSnippetWithBlank: `<table>\n  <___> ... </___>\n  <___> ... </___>\n  <___> ... </___>\n</table>`,
        options: [
          {
            id: 'opt-thead-tbody-tfoot',
            text: '<thead> (topo), seguido de <tbody> (corpo), e por fim <tfoot> (rodapé)',
            isCorrect: true,
            explanation:
              'Correto! Essa é a ordem natural que respeita o fluxo de leitura: cabeçalho -> dados -> totais.',
          },
          {
            id: 'opt-tbody-thead-tfoot',
            text: '<tbody> primeiro, depois <thead> e por fim <tfoot>',
            isCorrect: false,
            explanation:
              'O <thead> deve preceder o corpo da tabela para declarar as colunas antes dos dados.',
          },
          {
            id: 'opt-tfoot-only',
            text: 'Usar apenas <tfoot> repetido em todas as linhas',
            isCorrect: false,
            explanation:
              '<tfoot> é exclusivo para o rodapé final.',
          },
        ],
        correctOptionId: 'opt-thead-tbody-tfoot',
        explanationOnCorrect:
          'Arquitetura tabular perfeita! Cabeça, corpo e rodapé em harmonia absoluta.',
        explanationOnIncorrect:
          'Pense na ordem lógica: thead -> tbody -> tfoot.',
        xpReward: 20,
      },
      {
        id: 'step-8-2-challenge',
        type: 'practical_challenge',
        title: 'Desafio Prático: Acessibilidade com Scope',
        question: 'Qual valor deve preencher o atributo scope em uma célula <th> que define o título do topo de uma coluna vertical?',
        codeSnippetWithBlank: `<thead>\n  <tr>\n    <th scope="___">Preço</th>\n  </tr>\n</thead>`,
        correctAnswer: 'col',
        options: [
          {
            id: 'opt-scope-col',
            text: 'col',
            isCorrect: true,
            explanation:
              'Perfeito! "col" sinaliza para ferramentas assistivas que este <th> é o título de toda a coluna vertical correspondente.',
          },
          {
            id: 'opt-scope-row',
            text: 'row',
            isCorrect: false,
            explanation:
              '"row" é usado quando o <th> encabeça uma linha horizontal, não uma coluna do topo.',
          },
          {
            id: 'opt-scope-all',
            text: 'all',
            isCorrect: false,
            explanation:
              'O valor "all" não existe para o atributo scope da especificação HTML.',
          },
        ],
        correctOptionId: 'opt-scope-col',
        explanationOnCorrect:
          'Acessibilidade de alto nível alcançada! scope="col" transforma uma tabela simples em código profissional inclusivo.',
        explanationOnIncorrect:
          'Para colunas verticais, usamos scope="col". Para linhas horizontais, scope="row".',
        xpReward: 25,
      },
    ],
  },
};
