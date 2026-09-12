import { InteractiveLesson } from '@/types/learning';

export const HTML_MODULE_01_LESSONS: Record<string, InteractiveLesson> = {
  'les-1-1': {
    id: 'les-1-1',
    moduleId: 'html-mod-1',
    moduleOrder: 1,
    moduleTitle: 'Primeiros Passos com HTML',
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
          'Sempre que você abre um site no celular ou no computador, o navegador lê um arquivo HTML.\n\nPense no HTML como a estrutura de uma casa: as paredes, portas e janelas. Ele organiza o conteúdo da página e avisa o que é cada coisa: títulos, parágrafos de texto, imagens ou botões.',
        codeSnippet: `<h1>Minha Primeira Página</h1>\n<p>Olá! Este é um parágrafo construído com HTML.</p>`,
        tatuTip:
          'O HTML cuida da estrutura e do conteúdo. Cores, fontes e animações ficam para depois, com o CSS.',
        xpReward: 10,
      },
      {
        id: 'step-1-1-quiz-1',
        type: 'multiple_choice',
        title: 'Para que serve o HTML?',
        question: 'Qual é o papel principal do HTML em uma página da web?',
        options: [
          {
            id: 'opt-a',
            text: 'Definir a estrutura e o conteúdo da página, como títulos, textos e imagens.',
            isCorrect: true,
            explanation:
              'O HTML organiza todo o conteúdo e define o que aparece na página.',
          },
          {
            id: 'opt-b',
            text: 'Escolher as cores, sombras e animações visuais dos elementos.',
            isCorrect: false,
            explanation:
              'Cores e estilos visuais são funções do CSS. O HTML cuida do conteúdo.',
          },
          {
            id: 'opt-c',
            text: 'Conectar o computador à tomada ou ao roteador Wi-Fi.',
            isCorrect: false,
            explanation:
              'Isso faz parte da conexão de rede e do aparelho, não do código da página.',
          },
          {
            id: 'opt-d',
            text: 'Executar jogos em 3D e cálculos complexos de inteligência artificial.',
            isCorrect: false,
            explanation:
              'Lógica mais complexa fica para linguagens como JavaScript.',
          },
        ],
        correctOptionId: 'opt-a',
        explanationOnCorrect:
          'Na mosca! O HTML é a estrutura básica que organiza todo o conteúdo.',
        explanationOnIncorrect:
          'Lembre-se: o HTML cria a estrutura da página. Estilos e cores ficam para o CSS.',
        xpReward: 10,
      },
      {
        id: 'step-1-1-concept-tags',
        type: 'concept',
        title: 'Como funciona uma tag',
        conceptText:
          'No HTML, quase tudo é construído com tags.\n\nUma tag funciona como uma etiqueta com sinais de < e >. Quase sempre você usa um par:\n\n1. Tag de abertura: <p>\n2. Conteúdo no meio: seu texto\n3. Tag de fechamento com barra: </p>',
        codeSnippet: `<!-- Tag de abertura: <p> -->\n<!-- Tag de fechamento: </p> -->\n<p>Eu sou o texto que fica dentro do parágrafo!</p>`,
        tatuTip:
          'A barra "/" na tag final avisa o navegador onde o texto ou elemento termina.',
        xpReward: 5,
      },
      {
        id: 'step-1-1-quiz-2',
        type: 'multiple_choice',
        title: 'Fechando tags',
        question: 'Como fechar corretamente uma tag de parágrafo no HTML?',
        options: [
          {
            id: 'opt-close-a',
            text: '</p>',
            isCorrect: true,
            explanation:
              'A barra "/" antes da letra p indica que o parágrafo terminou: </p>.',
          },
          {
            id: 'opt-close-b',
            text: '<p/>',
            isCorrect: false,
            explanation:
              'Para parágrafos com texto no meio, a barra vem antes: </p>.',
          },
          {
            id: 'opt-close-c',
            text: '<fecha p>',
            isCorrect: false,
            explanation:
              'O HTML usa nomes específicos com a barra: </p>.',
          },
          {
            id: 'opt-close-d',
            text: '<p!>',
            isCorrect: false,
            explanation:
              'O ponto de exclamação só aparece em comentários e no <!DOCTYPE>.',
          },
        ],
        correctOptionId: 'opt-close-a',
        explanationOnCorrect:
          'Boa! Você fechou o parágrafo certinho com </p>.',
        explanationOnIncorrect:
          'Lembre da barra antes do nome da tag para fechar: </p>.',
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
    subtitle: 'Entenda o que compõe uma tag e seu conteúdo',
    estimatedMinutes: 3,
    totalXp: 30,
    steps: [
      {
        id: 'step-1-2-concept',
        type: 'concept',
        title: 'As 3 partes de um elemento',
        conceptText:
          'Quando juntamos abertura, conteúdo e fechamento, temos um elemento HTML completo.\n\nVeja como fica:\n1. Tag de abertura: <button>\n2. Conteúdo no meio: Clique aqui\n3. Tag de fechamento: </button>',
        codeSnippet: `<button>Clique Aqui</button>`,
        tatuTip:
          'Quase tudo que você vê em uma página é formado por elementos organizados.',
        xpReward: 10,
      },
      {
        id: 'step-1-2-quiz',
        type: 'multiple_choice',
        title: 'Conteúdo na tela',
        question: 'No código <h1>A Toca do Tatu</h1>, o que é o texto "A Toca do Tatu"?',
        options: [
          {
            id: 'opt-anat-a',
            text: 'O conteúdo que será exibido para o usuário na tela.',
            isCorrect: true,
            explanation:
              'O texto que fica entre a abertura <h1> e o fechamento </h1> é o conteúdo que aparece na tela.',
          },
          {
            id: 'opt-anat-b',
            text: 'Uma configuração oculta que ninguém pode ler.',
            isCorrect: false,
            explanation:
              'Na verdade, o texto entre as tags é exatamente o que as pessoas vão ler na tela.',
          },
          {
            id: 'opt-anat-c',
            text: 'O nome de um arquivo no disco rígido.',
            isCorrect: false,
            explanation: 'Nomes de arquivos costumam ter extensões, como index.html.',
          },
        ],
        correctOptionId: 'opt-anat-a',
        explanationOnCorrect:
          'Isso aí! O texto entre as tags é o que vai aparecer para quem visita a página.',
        explanationOnIncorrect:
          'Lembre-se: o que fica no meio das tags é o conteúdo exibido na tela.',
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
    subtitle: 'O primeiro exemplo que todo desenvolvedor cria',
    estimatedMinutes: 3,
    totalXp: 35,
    steps: [
      {
        id: 'step-1-3-concept',
        type: 'concept',
        title: 'O clássico Olá, Mundo!',
        conceptText:
          'Na programação, é tradição começar criando uma mensagem de boas-vindas: o famoso "Olá, Mundo!".\n\nNo HTML, você pode usar a tag <h1> para criar um título de destaque para a sua página.',
        codeSnippet: `<h1>Olá, Mundo!</h1>\n<p>Estou aprendendo a programar com o Tatu!</p>`,
        tatuTip:
          'Boa prática: use apenas um <h1> por página, para deixar claro qual é o assunto principal.',
        xpReward: 10,
      },
      {
        id: 'step-1-3-quiz',
        type: 'multiple_choice',
        title: 'Título principal',
        question: 'Qual tag usamos para criar o título principal de uma página?',
        options: [
          {
            id: 'opt-title-h1',
            text: '<h1>',
            isCorrect: true,
            explanation:
              'h1 vem de Heading 1: o título de maior destaque na página.',
          },
          {
            id: 'opt-title-p',
            text: '<p>',
            isCorrect: false,
            explanation: 'A tag <p> é para parágrafos comuns de texto.',
          },
          {
            id: 'opt-title-bold',
            text: '<negrito>',
            isCorrect: false,
            explanation: 'Essa tag não existe no HTML.',
          },
        ],
        correctOptionId: 'opt-title-h1',
        explanationOnCorrect:
          'Muito bem! Você acertou a tag do título principal.',
        explanationOnIncorrect:
          'Para títulos principais, lembre do <h1> (Heading 1).',
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
        title: 'A estrutura básica de uma página',
        conceptText:
          'Toda página HTML segue uma estrutura básica:\n\n1. <!DOCTYPE html>: avisa o navegador que estamos usando HTML moderno.\n2. <html>: a tag principal que envolve toda a página.\n3. <head>: guarda informações de configuração e o título da aba.\n4. <body>: aqui fica todo o conteúdo visível para quem acessa a página.',
        codeSnippet: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Meu Primeiro Site</title>\n  </head>\n  <body>\n    <h1>Olá, Visitante!</h1>\n  </body>\n</html>`,
        tatuTip:
          'Pense no <head> como as configurações da página e no <body> como tudo o que aparece na tela.',
        xpReward: 15,
      },
      {
        id: 'step-2-1-quiz',
        type: 'multiple_choice',
        title: 'Conteúdo visível',
        question: 'Onde colocamos os textos, botões e imagens que as pessoas vão ver na tela?',
        options: [
          {
            id: 'opt-2-body',
            text: 'Dentro da tag <body>.',
            isCorrect: true,
            explanation: 'O <body> é onde fica todo o conteúdo visível da página.',
          },
          {
            id: 'opt-2-head',
            text: 'Dentro da tag <head>.',
            isCorrect: false,
            explanation: 'O <head> guarda configurações e metadados, não o conteúdo visual direto.',
          },
          {
            id: 'opt-2-doctype',
            text: 'Dentro de <!DOCTYPE>.',
            isCorrect: false,
            explanation: '<!DOCTYPE html> apenas declara o tipo do documento, não recebe conteúdo.',
          },
        ],
        correctOptionId: 'opt-2-body',
        explanationOnCorrect:
          'Exatamente! Tudo o que você quer mostrar na tela fica dentro de <body>.',
        explanationOnIncorrect:
          'Lembre-se: o conteúdo visível fica sempre dentro da tag <body>.',
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
    subtitle: 'Aprenda a organizar a importância dos cabeçalhos',
    estimatedMinutes: 4,
    totalXp: 35,
    steps: [
      {
        id: 'step-2-2-concept',
        type: 'concept',
        title: 'Níveis de títulos',
        conceptText:
          'O HTML oferece 6 níveis de títulos: do <h1> (o título de maior destaque) até o <h6> (o menor subtítulo).\n\nEles ajudam as pessoas a entender a divisão do texto e também ajudam o Google a entender o assunto da página.',
        codeSnippet: `<h1>Título Principal (1 por página)</h1>\n<h2>Subtítulo de Seção</h2>\n<h3>Tópico Específico</h3>`,
        tatuTip:
          'Boa prática: use apenas um <h1> por página para representar o assunto central.',
        xpReward: 15,
      },
      {
        id: 'step-2-2-quiz',
        type: 'multiple_choice',
        title: 'Maior hierarquia',
        question: 'Qual tag representa o título mais importante da página?',
        options: [
          {
            id: 'opt-h1-best',
            text: '<h1>',
            isCorrect: true,
            explanation: '<h1> é a tag de nível mais alto, usada para o título principal.',
          },
          {
            id: 'opt-h6-best',
            text: '<h6>',
            isCorrect: false,
            explanation: '<h6> é o título de menor tamanho e menor hierarquia.',
          },
          {
            id: 'opt-h0-best',
            text: '<h0>',
            isCorrect: false,
            explanation: 'Não existe a tag <h0> no HTML.',
          },
        ],
        correctOptionId: 'opt-h1-best',
        explanationOnCorrect:
          'Perfeito! <h1> é o título principal da página.',
        explanationOnIncorrect:
          'Atenção: <h1> é o mais importante e vai descendo até <h6>.',
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
