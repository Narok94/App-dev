import { LearningModule, Quest } from '@/types/learning';

/**
 * Módulo 3: Palavras e Histórias
 * Pertencente à: Era da Descoberta (HTML)
 */
export const MODULE_03_PALAVRAS_HISTORIAS: LearningModule = {
  id: 'html-mod-3',
  eraId: 'era-descoberta',
  order: 3,
  title: 'Palavras e Histórias',
  tagline: 'Textos, títulos e ênfase na web',
  description:
    'Aprenda a usar títulos de h1 a h6 na ordem certa, criar parágrafos e dar ênfase a palavras importantes com strong e em.',
  status: 'locked',
  xpReward: 120,
  iconName: 'file-text',
  estimatedMinutes: 8,
  lessons: [
    {
      id: 'quest-html-3-1',
      title: 'Títulos e Hierarquia',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-3-2',
      title: 'Dando Ênfase: Strong, Em e Parágrafos',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
  ],
};

export const MODULE_03_QUESTS: Record<string, Quest> = {
  'quest-html-3-1': {
    id: 'quest-html-3-1',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-3',
    moduleOrder: 3,
    moduleTitle: 'Palavras e Histórias',
    title: 'Títulos e Hierarquia',
    subtitle: 'Organize títulos de h1 a h6 sem pular níveis',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-3-1-concept',
        type: 'concept',
        title: 'Níveis de títulos (h1 a h6)',
        conceptText:
          'O HTML oferece seis níveis de títulos: de <h1> até <h6>.\n\nEles funcionam como o sumário de um livro:\n• <h1>: Título principal (geralmente apenas 1 por página);\n• <h2>: Seções principais;\n• <h3>: Subseções;\n• <h4> a <h6>: Detalhes mais específicos.\n\nRegra importante: não escolha a tag pelo tamanho visual na tela! Escolha pela importância do conteúdo. Se precisar mudar o tamanho da fonte, o CSS cuida disso depois.',
        codeSnippet: `<h1>Guia da Culinária Brasileira</h1>\n<h2>Região Nordeste</h2>\n<h3>Moqueca Baiana</h3>\n<p>Prato tradicional com azeite de dendê e leite de coco.</p>`,
        tatuTip:
          'Pessoas com deficiência visual usam leitores de tela que pulam de título em título. Pular de <h1> direto para <h4> dificulta a navegação.',
        xpReward: 15,
      },
      {
        id: 'step-3-1-fix',
        type: 'code_fix',
        title: 'Hierarquia sem saltos',
        question: 'O desenvolvedor pulou de <h1> direto para <h4> apenas porque queria uma fonte menor. Qual é a tag correta para o segundo nível?',
        brokenCode: `<h1>Receitas do Mundo</h1>\n<h4>Pratos Principais</h4>\n<p>Descubra receitas deliciosas.</p>`,
        fixedCode: `<h1>Receitas do Mundo</h1>\n<h2>Pratos Principais</h2>\n<p>Descubra receitas deliciosas.</p>`,
        options: [
          {
            id: 'opt-fix-3-1-a',
            text: 'Substituir <h4> por <h2> para manter a sequência natural após o <h1>.',
            isCorrect: true,
            explanation:
              'Perfeito! O segundo nível logo após o <h1> deve ser <h2>, mantendo a organização da página.',
          },
          {
            id: 'opt-fix-3-1-b',
            text: 'Substituir <h4> por <small> direto sem título.',
            isCorrect: false,
            explanation:
              'Ainda precisamos de um cabeçalho para dar nome à seção.',
          },
          {
            id: 'opt-fix-3-1-c',
            text: 'Trocar o <h1> por outro <h4> para ficarem iguais.',
            isCorrect: false,
            explanation:
              'A página precisa de um <h1> principal para definir o assunto central.',
          },
        ],
        correctOptionId: 'opt-fix-3-1-a',
        explanationOnCorrect:
          'Boa! A ordem correta segue <h1>, depois <h2> e assim por diante.',
        explanationOnIncorrect:
          'Pense na ordem dos números: depois do 1 vem o 2 (<h2>).',
        xpReward: 20,
      },
      {
        id: 'step-3-1-choice',
        type: 'multiple_choice',
        title: 'Quantos <h1> usar?',
        question: 'Qual é a boa prática recomendada sobre a quantidade de tags <h1> em uma página?',
        options: [
          {
            id: 'opt-h1-single',
            text: 'Apenas 1 <h1> por página, representando o assunto central do documento.',
            isCorrect: true,
            explanation:
              'Exato! O Google e os leitores de tela entendem o <h1> como o título principal daquela página.',
          },
          {
            id: 'opt-h1-many',
            text: 'Colocar <h1> em todos os parágrafos para chamar mais atenção.',
            isCorrect: false,
            explanation:
              'Isso quebra a organização do documento e prejudica a leitura e a acessibilidade.',
          },
          {
            id: 'opt-h1-none',
            text: 'Nunca usar <h1>, começar direto pelo <h2>.',
            isCorrect: false,
            explanation:
              'O <h1> é essencial para indicar o tema principal da página.',
          },
        ],
        correctOptionId: 'opt-h1-single',
        explanationOnCorrect:
          'Muito bem! Usar apenas um <h1> ajuda a manter o assunto principal claro.',
        explanationOnIncorrect:
          'Lembre-se da capa de um livro: normalmente há apenas um título principal.',
        xpReward: 20,
      },
    ],
  },

  'quest-html-3-2': {
    id: 'quest-html-3-2',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-3',
    moduleOrder: 3,
    moduleTitle: 'Palavras e Histórias',
    title: 'Dando Ênfase: Strong, Em e Parágrafos',
    subtitle: 'Aprenda a destacar palavras de forma clara e acessível',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-3-2-concept',
        type: 'concept',
        title: 'Dando destaque às palavras',
        conceptText:
          'No HTML moderno, as tags de texto transmitem significado:\n\n• <strong>: indica algo de grande importância ou um alerta importante. Leitores de tela costumam ler com tom enfático.\n• <em>: ênfase de fala, como mudar a entonação em uma palavra importante.\n• <br>: serve para quebras de linha obrigatórias, como em versos de poemas ou endereços. Para parágrafos comuns, crie novas tags <p>!',
        codeSnippet: `<p>Atenção: <strong>não compartilhe sua senha</strong> com ninguém.</p>\n<p>Eu <em>realmente</em> preciso praticar hoje.</p>`,
        tatuTip:
          'Evite usar vários <br><br> seguidos para empurrar coisas para baixo. Espaçamentos entre seções devem ser feitos com CSS!',
        xpReward: 15,
      },
      {
        id: 'step-3-2-completion',
        type: 'code_completion',
        title: 'Aviso importante',
        question: 'Qual tag usamos para destacar um aviso com grande importância?',
        codeSnippetWithBlank: `<p>Aviso de segurança: <___>Nunca informe seu código de ativação</___>.</p>`,
        correctAnswer: 'strong',
        options: [
          {
            id: 'opt-comp-strong',
            text: 'strong',
            isCorrect: true,
            explanation:
              'Excelente! <strong> destaca o texto visualmente e também avisa leitores de tela que é importante.',
          },
          {
            id: 'opt-comp-bold',
            text: 'b',
            isCorrect: false,
            explanation:
              'A tag <b> só deixa em negrito visualmente, sem avisar o leitor de tela que é algo urgente.',
          },
          {
            id: 'opt-comp-mark',
            text: 'mark',
            isCorrect: false,
            explanation:
              '<mark> serve como marca-texto, mas para alertas de segurança a recomendação é <strong>.',
          },
          {
            id: 'opt-comp-red',
            text: 'red',
            isCorrect: false,
            explanation:
              'Essa tag não existe no HTML.',
          },
        ],
        correctOptionId: 'opt-comp-strong',
        explanationOnCorrect:
          'Muito bem! A tag <strong> dá o destaque ideal para avisos importantes.',
        explanationOnIncorrect:
          'Para avisos importantes, usamos a tag <strong>.',
        xpReward: 20,
      },
      {
        id: 'step-3-2-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: quebras de linha',
        question: 'É uma boa prática no HTML usar várias tags <br><br><br> seguidas para criar espaço entre as seções.',
        isTrue: false,
        options: [
          {
            id: 'opt-tf-br-v',
            text: 'Verdadeiro',
            isCorrect: false,
            explanation:
              'Na verdade não! Usar vários <br> para afastar elementos é uma prática ultrapassada. Espaçamento visual é papel do CSS.',
          },
          {
            id: 'opt-tf-br-f',
            text: 'Falso',
            isCorrect: true,
            explanation:
              'Isso mesmo! O <br> serve para quebras de linha que fazem parte do texto (como poesias ou endereços). O espaçamento da página fica para o CSS.',
          },
        ],
        correctOptionId: 'opt-tf-br-f',
        explanationOnCorrect:
          'Muito bem! O HTML organiza o conteúdo, enquanto o CSS cuida do espaçamento visual.',
        explanationOnIncorrect:
          'Lembre-se: tags HTML definem conteúdo. O espaçamento visual fica por conta do CSS.',
        xpReward: 20,
      },
    ],
  },
};
