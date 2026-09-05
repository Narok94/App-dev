import { InteractiveLesson } from '@/types/learning';

export const HTML_MODULE_01_LESSONS: Record<string, InteractiveLesson> = {
  'les-1-1': {
    id: 'les-1-1',
    moduleId: 'html-mod-1',
    moduleOrder: 1,
    moduleTitle: 'Primeiros Passos com HTML',
    title: 'O que é HTML?',
    subtitle: 'A fundação de toda a internet explicada de forma simples',
    estimatedMinutes: 3,
    totalXp: 35,
    steps: [
      {
        id: 'step-1-1-concept',
        type: 'concept',
        title: 'O Alicerce da Web',
        conceptText:
          'Toda vez que você acessa um site pelo celular ou computador, seu navegador (como o Chrome ou Safari) está lendo um arquivo escrito em HTML.\n\nImagine que construir um site é como construir uma casa (ou cavar uma toca segura!): o HTML é a estrutura básica de alvenaria e paredes. Ele diz exatamente o que cada item é — se aquilo é um título, um parágrafo de texto, uma imagem ou um botão.',
        codeSnippet: `<h1>Minha Primeira Página</h1>\n<p>Olá! Este é um parágrafo construído com HTML.</p>`,
        tatuTip:
          'O HTML não se preocupa com cores ou animações sofisticadas por enquanto. A missão dele é dar estrutura e sentido ao conteúdo!',
        xpReward: 10,
      },
      {
        id: 'step-1-1-quiz-1',
        type: 'multiple_choice',
        title: 'Primeiro Desafio: O Papel do HTML',
        question: 'Qual é o principal papel do HTML na criação de uma página web?',
        options: [
          {
            id: 'opt-a',
            text: 'Definir a estrutura e o conteúdo da página, como títulos, textos e imagens.',
            isCorrect: true,
            explanation:
              'O HTML é a fundação que organiza e dá sentido a todo o conteúdo visual do site.',
          },
          {
            id: 'opt-b',
            text: 'Escolher as cores, sombras e animações visuais dos elementos.',
            isCorrect: false,
            explanation:
              'Cores e estilos são funções do CSS! O HTML cuida da estrutura e do conteúdo.',
          },
          {
            id: 'opt-c',
            text: 'Conectar o computador à tomada ou ao roteador Wi-Fi.',
            isCorrect: false,
            explanation:
              'Isso faz parte do hardware e da rede, nada a ver com o código da página.',
          },
          {
            id: 'opt-d',
            text: 'Executar jogos em 3D e cálculos complexos de inteligência artificial.',
            isCorrect: false,
            explanation:
              'Lógicas e processamento avançado usam linguagens como JavaScript no navegador.',
          },
        ],
        correctOptionId: 'opt-a',
        explanationOnCorrect:
          'Muito bem! Você pegou o conceito: o HTML é o esqueleto que sustenta todo o conteúdo de um site.',
        explanationOnIncorrect:
          'Quase lá! Lembre-se da analogia do Tatu: o HTML é o alicerce e as paredes que dão estrutura ao conteúdo.',
        xpReward: 10,
      },
      {
        id: 'step-1-1-concept-tags',
        type: 'concept',
        title: 'Como as Tags Funcionam',
        conceptText:
          'HTML significa "HyperText Markup Language" (Linguagem de Marcação de Hipertexto).\n\nEssa "marcação" é feita através de TAGS (etiquetas). As tags ficam sempre entre os sinais de menor e maior: < e >.\n\nA maioria das tags vem em pares: uma tag de abertura para iniciar e uma tag de fechamento com uma barra inclinada (/) para avisar que terminou.',
        codeSnippet: `<!-- Tag de abertura: <p> -->\n<!-- Tag de fechamento: </p> -->\n<p>Eu sou o texto que fica dentro do parágrafo!</p>`,
        tatuTip:
          'A barra inclinada "/" é o segredo do fechamento. É ela quem avisa o navegador: "acabou este pedaço!"',
        xpReward: 5,
      },
      {
        id: 'step-1-1-quiz-2',
        type: 'multiple_choice',
        title: 'Desafio das Tags: Abertura e Fechamento',
        question: 'Como indicamos o fechamento correto de uma tag de parágrafo no HTML?',
        options: [
          {
            id: 'opt-close-a',
            text: '</p>',
            isCorrect: true,
            explanation:
              'A barra "/" imediatamente antes do nome da tag indica que ela está sendo fechada.',
          },
          {
            id: 'opt-close-b',
            text: '<p/>',
            isCorrect: false,
            explanation:
              'No fechamento padrão de elementos com conteúdo, a barra vem antes do nome: </p>.',
          },
          {
            id: 'opt-close-c',
            text: '<fecha p>',
            isCorrect: false,
            explanation:
              'O HTML usa o caractere de barra "/" universalmente para fechar tags, e não palavras.',
          },
          {
            id: 'opt-close-d',
            text: '<p!>',
            isCorrect: false,
            explanation:
              'O ponto de exclamação é usado em comentários ou no <!DOCTYPE>, nunca no fechamento.',
          },
        ],
        correctOptionId: 'opt-close-a',
        explanationOnCorrect:
          'Perfeito! A tag </p> fecha com precisão o parágrafo aberto com <p>.',
        explanationOnIncorrect:
          'Atenção à posição da barra: para fechar uma tag, colocamos </nome-da-tag>.',
        xpReward: 10,
      },
    ],
  },
  'les-1-2': {
    id: 'les-1-2',
    moduleId: 'html-mod-1',
    moduleOrder: 1,
    moduleTitle: 'Primeiros Passos com HTML',
    title: 'Anatomia de uma Tag',
    subtitle: 'Abertura, conteúdo e fechamento em detalhes',
    estimatedMinutes: 3,
    totalXp: 30,
    steps: [
      {
        id: 'step-1-2-concept',
        type: 'concept',
        title: 'As 3 Partes de um Elemento',
        conceptText:
          'Quando juntamos uma tag de abertura, o conteúdo e a tag de fechamento, temos um Elemento HTML completo.\n\nVeja a estrutura:\n1. Tag de abertura: <button>\n2. Conteúdo: Clique Aqui\n3. Tag de fechamento: </button>',
        codeSnippet: `<button>Clique Aqui</button>`,
        tatuTip:
          'Tudo que você vê na tela é um elemento ou uma combinação organizada de vários deles!',
        xpReward: 10,
      },
      {
        id: 'step-1-2-quiz',
        type: 'multiple_choice',
        title: 'Desafio de Anatomia',
        question: 'No código <h1>A Toca do Tatu</h1>, o que é o texto "A Toca do Tatu"?',
        options: [
          {
            id: 'opt-anat-a',
            text: 'O conteúdo que será exibido para o usuário na tela.',
            isCorrect: true,
            explanation:
              'O texto entre a abertura <h1> e o fechamento </h1> é o conteúdo visual do elemento.',
          },
          {
            id: 'opt-anat-b',
            text: 'Uma configuração oculta que ninguém pode ler.',
            isCorrect: false,
            explanation:
              'Pelo contrário! O conteúdo entre as tags é o que o navegador renderiza aos visitantes.',
          },
          {
            id: 'opt-anat-c',
            text: 'O nome de um arquivo no disco rígido.',
            isCorrect: false,
            explanation: 'Nomes de arquivos têm extensões como .html ou .png.',
          },
        ],
        correctOptionId: 'opt-anat-a',
        explanationOnCorrect:
          'Isso aí! O texto envolto pelas tags é exatamente o que as pessoas verão na página.',
        explanationOnIncorrect:
          'Lembre-se: o que fica no meio das tags é o conteúdo exibido na página.',
        xpReward: 20,
      },
    ],
  },
  'les-1-3': {
    id: 'les-1-3',
    moduleId: 'html-mod-1',
    moduleOrder: 1,
    moduleTitle: 'Primeiros Passos com HTML',
    title: 'Seu primeiro "Olá, Mundo!"',
    subtitle: 'A clássica tradição de todos os programadores',
    estimatedMinutes: 3,
    totalXp: 35,
    steps: [
      {
        id: 'step-1-3-concept',
        type: 'concept',
        title: 'A Tradição do Olá Mundo',
        conceptText:
          'Na programação, todo mundo começa criando uma mensagem de boas-vindas: o famoso "Olá, Mundo!" (ou Hello, World!).\n\nEm HTML, podemos usar a tag <h1> para dar um título bem grande e marcante!',
        codeSnippet: `<h1>Olá, Mundo!</h1>\n<p>Estou aprendendo a programar com o Tatu!</p>`,
        tatuTip:
          'A tag <h1> significa "Heading 1" — o título de maior hierarquia e importância da página.',
        xpReward: 10,
      },
      {
        id: 'step-1-3-quiz',
        type: 'multiple_choice',
        title: 'Desafio do Título',
        question: 'Qual tag usamos para criar o título principal de uma página?',
        options: [
          {
            id: 'opt-title-h1',
            text: '<h1>',
            isCorrect: true,
            explanation:
              'h1 significa Heading 1: o título de primeiro e maior nível de importância.',
          },
          {
            id: 'opt-title-p',
            text: '<p>',
            isCorrect: false,
            explanation: 'A tag <p> é reservada para parágrafos comuns de texto.',
          },
          {
            id: 'opt-title-bold',
            text: '<negrito>',
            isCorrect: false,
            explanation: 'Essa tag não existe no vocabulário padrão do HTML.',
          },
        ],
        correctOptionId: 'opt-title-h1',
        explanationOnCorrect:
          'Excelente! Você completou com maestria os conceitos essenciais do Módulo 01!',
        explanationOnIncorrect:
          'Para títulos principais, lembre-se da tag <h1> (Heading 1)!',
        xpReward: 25,
      },
    ],
  },
  'les-2-1': {
    id: 'les-2-1',
    moduleId: 'html-mod-2',
    moduleOrder: 2,
    moduleTitle: 'Estrutura Básica & Textos',
    title: 'O Esqueleto Padrão',
    subtitle: '<!DOCTYPE html>, <html>, <head> e <body>',
    estimatedMinutes: 4,
    totalXp: 40,
    steps: [
      {
        id: 'step-2-1-concept',
        type: 'concept',
        title: 'A Estrutura Padrão de Qualquer Site',
        conceptText:
          'Todo documento HTML profissional segue uma estrutura universal:\n\n1. <!DOCTYPE html>: Avise o navegador que estamos usando a versão moderna do HTML5.\n2. <html>: O elemento raiz que envolve tudo.\n3. <head>: Guarda informações invisíveis na tela, como título da aba e configurações.\n4. <body>: Onde mora todo o conteúdo visível aos olhos do visitante!',
        codeSnippet: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Meu Primeiro Site</title>\n  </head>\n  <body>\n    <h1>Olá, Visitante!</h1>\n  </body>\n</html>`,
        tatuTip:
          'Pense no <head> como o cérebro que planeja e no <body> como o corpo visível da sua página!',
        xpReward: 15,
      },
      {
        id: 'step-2-1-quiz',
        type: 'multiple_choice',
        title: 'Desafio do Esqueleto',
        question: 'Onde devemos colocar os textos, botões e imagens que os usuários devem ver na tela?',
        options: [
          {
            id: 'opt-2-body',
            text: 'Dentro da tag <body>.',
            isCorrect: true,
            explanation: 'O <body> ("corpo") é a seção onde todo o conteúdo visível de uma página deve ficar!',
          },
          {
            id: 'opt-2-head',
            text: 'Dentro da tag <head>.',
            isCorrect: false,
            explanation: 'O <head> guarda metadados e configurações, não o conteúdo visual direto.',
          },
          {
            id: 'opt-2-doctype',
            text: 'Dentro de <!DOCTYPE>.',
            isCorrect: false,
            explanation: '<!DOCTYPE html> apenas declara a versão do HTML, não recebe conteúdo.',
          },
        ],
        correctOptionId: 'opt-2-body',
        explanationOnCorrect:
          'Exatamente! O <body> acolhe tudo o que é renderizado para as pessoas no navegador.',
        explanationOnIncorrect:
          'Lembre-se: o conteúdo visível vai sempre dentro do <body>.',
        xpReward: 25,
      },
    ],
  },
  'les-2-2': {
    id: 'les-2-2',
    moduleId: 'html-mod-2',
    moduleOrder: 2,
    moduleTitle: 'Estrutura Básica & Textos',
    title: 'Hierarquia de Títulos (h1 até h6)',
    subtitle: 'Organizando a importância dos cabeçalhos',
    estimatedMinutes: 4,
    totalXp: 35,
    steps: [
      {
        id: 'step-2-2-concept',
        type: 'concept',
        title: 'Níveis de Títulos em HTML',
        conceptText:
          'O HTML nos dá 6 níveis de títulos: de <h1> (o mais importante e de maior destaque) até <h6> (o menor subtítulo).\n\nEles ajudam tanto os leitores a entender a estrutura do texto quanto os motores de busca (como o Google) a indexar seu conteúdo!',
        codeSnippet: `<h1>Título Principal (1 por página)</h1>\n<h2>Subtítulo de Seção</h2>\n<h3>Tópico Específico</h3>`,
        tatuTip:
          'Dica de ouro: Use apenas um <h1> por página para representar o assunto central do documento!',
        xpReward: 15,
      },
      {
        id: 'step-2-2-quiz',
        type: 'multiple_choice',
        title: 'Desafio da Hierarquia',
        question: 'Qual tag representa o título de maior importância e hierarquia em um documento?',
        options: [
          {
            id: 'opt-h1-best',
            text: '<h1>',
            isCorrect: true,
            explanation: 'O <h1> é a tag de nível mais alto para o título principal.',
          },
          {
            id: 'opt-h6-best',
            text: '<h6>',
            isCorrect: false,
            explanation: '<h6> é o título de menor nível e menor tamanho.',
          },
          {
            id: 'opt-h0-best',
            text: '<h0>',
            isCorrect: false,
            explanation: 'Não existe a tag <h0> no HTML!',
          },
        ],
        correctOptionId: 'opt-h1-best',
        explanationOnCorrect:
          'Perfeito! O <h1> comanda o topo da hierarquia visual e semântica!',
        explanationOnIncorrect:
          'Atenção à contagem: <h1> é o maior e mais importante, descendo até <h6>.',
        xpReward: 20,
      },
    ],
  },
};

/**
 * Busca uma lição específica por ID
 */
export function getLessonById(lessonId: string): InteractiveLesson | null {
  return HTML_MODULE_01_LESSONS[lessonId] || null;
}

/**
 * Retorna a primeira lição do módulo especificado
 */
export function getFirstLessonOfModule(moduleId: string): InteractiveLesson | null {
  if (moduleId === 'html-mod-2') {
    return HTML_MODULE_01_LESSONS['les-2-1'] || HTML_MODULE_01_LESSONS['les-1-1'];
  }
  return HTML_MODULE_01_LESSONS['les-1-1'];
}
