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
  tagline: 'A arte da tipografia e do texto na Web',
  description:
    'Domine a hierarquia semântica de títulos de h1 a h6, parágrafos fluidos, ênfases semânticas com strong e em, e evite armadilhas visuais comuns.',
  status: 'locked',
  xpReward: 120,
  iconName: 'file-text',
  estimatedMinutes: 8,
  lessons: [
    {
      id: 'quest-html-3-1',
      title: 'A Arte dos Títulos & Hierarquia',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-3-2',
      title: 'Ênfase & Sentido: Strong, Em e Parágrafos',
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
    title: 'A Arte dos Títulos & Hierarquia',
    subtitle: 'Aprenda a estruturar títulos de h1 a h6 sem nunca pular níveis',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-3-1-concept',
        type: 'concept',
        title: 'A Escala de Cabeçalhos (h1 a h6)',
        conceptText:
          'O HTML oferece seis níveis de títulos: de <h1> até <h6>.\n\nEles funcionam exatamente como o sumário de um livro acadêmico ou relatório:\n• <h1>: Título do livro (apenas 1 por página);\n• <h2>: Capítulos principais;\n• <h3>: Subseções dos capítulos;\n• <h4> a <h6>: Detalhes mais profundos.\n\nRegra sagrada de ouro: NUNCA escolha uma tag de título pelo tamanho visual que ela tem na tela! Escolha sempre pela relevância lógica do conteúdo. Se o texto precisa ser menor, o CSS cuidará disso depois.',
        codeSnippet: `<h1>Guia da Culinária Brasileira</h1>\n<h2>Região Nordeste</h2>\n<h3>Moqueca Baiana</h3>\n<p>Prato tradicional com azeite de dendê e leite de coco.</p>`,
        tatuTip:
          'Leitores de tela usados por pessoas cegas navegam de cabeçalho em cabeçalho. Se você pular de <h1> direto para <h4>, a pessoa fica desorientada.',
        xpReward: 15,
      },
      {
        id: 'step-3-1-fix',
        type: 'code_fix',
        title: 'Correção de Bug: O Salto Proibido na Hierarquia',
        question: 'O desenvolvedor pulou de <h1> direto para <h4> porque queria a fonte menor. Corrija para a tag hierarquicamente correta de segundo nível:',
        brokenCode: `<h1>Receitas do Mundo</h1>\n<h4>Pratos Principais</h4>\n<p>Descubra receitas deliciosas.</p>`,
        fixedCode: `<h1>Receitas do Mundo</h1>\n<h2>Pratos Principais</h2>\n<p>Descubra receitas deliciosas.</p>`,
        options: [
          {
            id: 'opt-fix-3-1-a',
            text: 'Substituir <h4> por <h2> para respeitar a sequência lógica após o <h1>.',
            isCorrect: true,
            explanation:
              'Perfeito! O segundo nível de hierarquia após o <h1> deve sempre ser <h2>, mantendo a estrutura ordenada.',
          },
          {
            id: 'opt-fix-3-1-b',
            text: 'Substituir <h4> por <small> direto sem título.',
            isCorrect: false,
            explanation:
              'Ainda precisamos de um cabeçalho para categorizar a seção.',
          },
          {
            id: 'opt-fix-3-1-c',
            text: 'Trocar o <h1> por outro <h4> para ficarem iguais.',
            isCorrect: false,
            explanation:
              'A página precisa de um <h1> principal para definir o tema central.',
          },
        ],
        correctOptionId: 'opt-fix-3-1-a',
        explanationOnCorrect:
          'Semântica recuperada com elegância! <h1> precede <h2>, que precede <h3>, sem saltos arbitrários.',
        explanationOnIncorrect:
          'Pense na ordem natural dos números: depois do 1 vem o 2 (<h2>)!',
        xpReward: 20,
      },
      {
        id: 'step-3-1-choice',
        type: 'multiple_choice',
        title: 'Missão: Quantos <h1> usar?',
        question: 'Qual é a recomendação de boas práticas modernas sobre a quantidade de tags <h1> em uma página comum?',
        options: [
          {
            id: 'opt-h1-single',
            text: 'Apenas 1 <h1> por página, representando o tema central do documento.',
            isCorrect: true,
            explanation:
              'Exato! Mecanismos de busca e leitores de tela entendem o <h1> como o título definitivo daquele documento.',
          },
          {
            id: 'opt-h1-many',
            text: 'Colocar <h1> em todos os parágrafos para chamar mais atenção.',
            isCorrect: false,
            explanation:
              'Isso destrói a hierarquia semântica e prejudica gravemente a acessibilidade e o SEO.',
          },
          {
            id: 'opt-h1-none',
            text: 'Nunca usar <h1>, começar direto pelo <h2>.',
            isCorrect: false,
            explanation:
              'O <h1> é essencial para a indexação e identificação do propósito da página.',
          },
        ],
        correctOptionId: 'opt-h1-single',
        explanationOnCorrect:
          'Mestria em semântica! Um único <h1> forte ancora todo o conteúdo da página.',
        explanationOnIncorrect:
          'Lembre-se da analogia do livro: um livro tem apenas um título de capa principal.',
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
    title: 'Ênfase & Sentido: Strong, Em e Parágrafos',
    subtitle: 'Comunique significado de verdade através de tags de texto semânticas',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-3-2-concept',
        type: 'concept',
        title: 'Texto com Alma e Significado',
        conceptText:
          'Antigamente, as pessoas usavam <b> para negrito e <i> para itálico apenas para enfeitar o texto.\n\nNo HTML5 moderno, valorizamos o SIGNIFICADO:\n• <strong>: indica algo de grande importância, gravidade ou alerta urgente. Leitores de tela leem com tom enfático.\n• <em>: ênfase de fala (stress emphasis), como mudar o tom de voz em uma palavra.\n• <br>: serve estritamente para quebrar linha onde a quebra faz parte do conteúdo (como em estrofes de poemas ou linhas de endereço). Para separar blocos de ideias normais, use novos parágrafos <p>!',
        codeSnippet: `<p>Atenção: <strong>não compartilhe sua senha</strong> com ninguém.</p>\n<p>Eu <em>realmente</em> preciso dominar este conceito hoje.</p>`,
        tatuTip:
          'Nunca use múltiplos <br><br><br> para empurrar conteúdo para baixo na tela. Espaçamentos visuais são responsabilidade de margens no CSS!',
        xpReward: 15,
      },
      {
        id: 'step-3-2-completion',
        type: 'code_completion',
        title: 'Completar Código: Alerta de Importância',
        question: 'Complete a tag semântica ideal para marcar o aviso como de alta importância e urgência:',
        codeSnippetWithBlank: `<p>Aviso de segurança: <___>Nunca informe seu código de ativação</___>.</p>`,
        correctAnswer: 'strong',
        options: [
          {
            id: 'opt-comp-strong',
            text: 'strong',
            isCorrect: true,
            explanation:
              'Excelente! <strong> comunica importância séria e prioritária tanto visualmente quanto semântica e audivelmente.',
          },
          {
            id: 'opt-comp-bold',
            text: 'b',
            isCorrect: false,
            explanation:
              'A tag <b> apenas aplica negrito visual sem comunicar importância semântica aos leitores de tela.',
          },
          {
            id: 'opt-comp-mark',
            text: 'mark',
            isCorrect: false,
            explanation:
              '<mark> serve para destacar texto (como com caneta marca-texto), mas para alertas de segurança usamos <strong>.',
          },
          {
            id: 'opt-comp-red',
            text: 'red',
            isCorrect: false,
            explanation:
              'A tag <red> não existe no HTML padrão.',
          },
        ],
        correctOptionId: 'opt-comp-strong',
        explanationOnCorrect:
          'Tag precisa escolhida! <strong> protege a semântica e a acessibilidade da mensagem.',
        explanationOnIncorrect:
          'Para alertas sérios e importância alta, a palavra-chave é: strong.',
        xpReward: 20,
      },
      {
        id: 'step-3-2-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: Quebras de Linha',
        question: 'É uma boa prática moderna de HTML usar três ou mais tags <br><br><br> consecutivas para criar espaço vertical entre seções.',
        isTrue: false,
        options: [
          {
            id: 'opt-tf-br-v',
            text: 'Verdadeiro',
            isCorrect: false,
            explanation:
              'Incorreto! Empilhar <br> para espaçamento é uma má prática grave. Espaçamento visual deve ser feito com CSS (margin/padding).',
          },
          {
            id: 'opt-tf-br-f',
            text: 'Falso',
            isCorrect: true,
            explanation:
              'Correto! O <br> serve exclusivamente para quebras semânticas de conteúdo (como versos de poesia ou linhas de CEP). Espaçamento é função do CSS.',
          },
        ],
        correctOptionId: 'opt-tf-br-f',
        explanationOnCorrect:
          'Mentalidade de desenvolvedor profissional! HTML cuida do significado; o CSS cuidará dos espaços em branco.',
        explanationOnIncorrect:
          'Lembre-se: tags HTML nunca devem ser usadas como "espaçadores visuais".',
        xpReward: 20,
      },
    ],
  },
};
