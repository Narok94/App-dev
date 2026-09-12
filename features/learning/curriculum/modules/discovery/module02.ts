import { LearningModule, Quest } from '@/types/learning';

/**
 * Módulo 2: A Estrutura do Mundo
 * Pertencente à: Era da Descoberta (HTML)
 */
export const MODULE_02_ESTRUTURA_MUNDO: LearningModule = {
  id: 'html-mod-2',
  eraId: 'era-descoberta',
  order: 2,
  title: 'A Estrutura do Mundo',
  tagline: 'A estrutura de toda página',
  description:
    'Aprenda como o navegador lê um documento com <!DOCTYPE html>, <html>, <head> e <body>, e conheça os dados básicos da página.',
  status: 'locked',
  xpReward: 120,
  iconName: 'code',
  estimatedMinutes: 8,
  lessons: [
    {
      id: 'quest-html-2-1',
      title: 'O Esqueleto Universal',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-2-2',
      title: 'Os Bastidores: Head & Metadados',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
  ],
};

export const MODULE_02_QUESTS: Record<string, Quest> = {
  'quest-html-2-1': {
    id: 'quest-html-2-1',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-2',
    moduleOrder: 2,
    moduleTitle: 'A Estrutura do Mundo',
    title: 'O Esqueleto Universal',
    subtitle: 'Entenda as tags essenciais que todo arquivo HTML precisa ter',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-2-1-concept',
        type: 'concept',
        title: 'A estrutura do documento',
        conceptText:
          'Todo arquivo HTML começa avisando ao navegador que versão está usando:\n<!DOCTYPE html>\nEssa linha avisa que a página usa HTML moderno (HTML5).\n\nLogo em seguida vem a tag raiz: <html> (com o atributo lang="pt-BR" para indicar o idioma).\n\nDentro dela ficam duas partes fundamentais:\n1. <head>: configurações da página (título da aba, codificação de texto e ajustes);\n2. <body>: todo o conteúdo visível que as pessoas vão ver e usar na tela.',
        codeSnippet: `<!DOCTYPE html>\n<html lang="pt-BR">\n  <head>\n    <title>Meu Portal</title>\n  </head>\n  <body>\n    <h1>Bem-vindo!</h1>\n  </body>\n</html>`,
        tatuTip:
          'Informações de configuração ficam no <head>. Textos, botões e imagens ficam no <body>.',
        xpReward: 15,
      },
      {
        id: 'step-2-1-completion',
        type: 'code_completion',
        title: 'A tag raiz',
        question: 'Qual tag envolve todo o documento HTML logo após o <!DOCTYPE html>?',
        codeSnippetWithBlank: `<!DOCTYPE html>\n<___ lang="pt-BR">\n  <head><title>App</title></head>\n  <body><p>Conteúdo</p></body>\n</___>`,
        correctAnswer: 'html',
        options: [
          {
            id: 'opt-2-1-a',
            text: 'html',
            isCorrect: true,
            explanation:
              'Isso mesmo! A tag <html> é a raiz que envolve tanto o <head> quanto o <body>.',
          },
          {
            id: 'opt-2-1-b',
            text: 'body',
            isCorrect: false,
            explanation:
              'O <body> fica dentro de <html>, ele não envolve o <head>.',
          },
          {
            id: 'opt-2-1-c',
            text: 'main',
            isCorrect: false,
            explanation:
              '<main> fica dentro do <body> para destacar o conteúdo principal.',
          },
          {
            id: 'opt-2-1-d',
            text: 'page',
            isCorrect: false,
            explanation:
              'Essa tag não existe no HTML.',
          },
        ],
        correctOptionId: 'opt-2-1-a',
        explanationOnCorrect:
          'Boa! A tag <html> é a tag principal que abraça todo o documento.',
        explanationOnIncorrect:
          'Lembre-se: a tag que envolve toda a página logo após o doctype é <html>.',
        xpReward: 20,
      },
      {
        id: 'step-2-1-fix',
        type: 'code_fix',
        title: 'Estrutura fora de ordem',
        question: 'O código abaixo foi montado fora de ordem. Qual é a correção correta?',
        brokenCode: `<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Conteúdo</h1>\n  </body>\n  <head>\n    <title>Minha Página</title>\n  </head>\n</html>`,
        fixedCode: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Minha Página</title>\n  </head>\n  <body>\n    <h1>Conteúdo</h1>\n  </body>\n</html>`,
        options: [
          {
            id: 'opt-fix-2-1-a',
            text: 'O <head> deve vir antes do <body> dentro do elemento <html>.',
            isCorrect: true,
            explanation:
              'Exato! No HTML, o <head> (configurações) vem sempre antes do <body> (conteúdo visível).',
          },
          {
            id: 'opt-fix-2-1-b',
            text: 'Devemos remover a tag <body> para o código compilar.',
            isCorrect: false,
            explanation:
              'O <body> é essencial para exibir o conteúdo da tela, não devemos apagá-lo.',
          },
          {
            id: 'opt-fix-2-1-c',
            text: 'O <!DOCTYPE html> deveria estar dentro do <body>.',
            isCorrect: false,
            explanation:
              'O <!DOCTYPE html> deve ficar sempre na primeiríssima linha do arquivo.',
          },
        ],
        correctOptionId: 'opt-fix-2-1-a',
        explanationOnCorrect:
          'Muito bem! Primeiro vem o <head> e depois o <body>.',
        explanationOnIncorrect:
          'Olhe a posição das tags: o <head> foi colocado depois do <body> por engano.',
        xpReward: 20,
      },
    ],
  },

  'quest-html-2-2': {
    id: 'quest-html-2-2',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-2',
    moduleOrder: 2,
    moduleTitle: 'A Estrutura do Mundo',
    title: 'Os Bastidores: Head & Metadados',
    subtitle: 'Conheça a tag <title>, o charset UTF-8 e o ajuste para celulares',
    estimatedMinutes: 4,
    totalXp: 50,
    steps: [
      {
        id: 'step-2-2-concept',
        type: 'concept',
        title: 'Configurações com a tag <head>',
        conceptText:
          'A tag <head> guarda informações importantes para o navegador e mecanismos de busca:\n\n1. <meta charset="UTF-8">: garante que acentos da nossa língua (como á, ç, ã) e emojis apareçam sem erros na tela.\n\n2. <meta name="viewport" content="width=device-width, initial-scale=1.0">: avisa os celulares para adaptarem o tamanho da página à tela do aparelho.\n\n3. <title>: o texto que dá nome à página na aba do navegador e nos resultados do Google.',
        codeSnippet: `<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>App-dev | Aprenda HTML</title>\n</head>`,
        tatuTip:
          'O <title> é o nome da sua página na aba. Escolha títulos objetivos e fáceis de entender.',
        xpReward: 15,
      },
      {
        id: 'step-2-2-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: acentuação',
        question: 'A tag <meta charset="UTF-8"> serve para garantir que acentos e emojis apareçam corretamente na página.',
        isTrue: true,
        options: [
          {
            id: 'opt-tf-v',
            text: 'Verdadeiro',
            isCorrect: true,
            explanation:
              'Isso mesmo! UTF-8 é o formato padrão para exibir acentos e caracteres especiais sem quebrar.',
          },
          {
            id: 'opt-tf-f',
            text: 'Falso',
            isCorrect: false,
            explanation:
              'Na verdade ela serve exatamente para isso. Sem UTF-8, palavras com acento podem ficar com símbolos estranhos.',
          },
        ],
        correctOptionId: 'opt-tf-v',
        explanationOnCorrect:
          'Perfeito! O UTF-8 evita problemas com acentos e caracteres especiais.',
        explanationOnIncorrect:
          'Dica: charset="UTF-8" garante que letras com acento e emojis apareçam sem erro.',
        xpReward: 15,
      },
      {
        id: 'step-2-2-completion',
        type: 'code_completion',
        title: 'Título da aba',
        question: 'Complete a tag que define o título exibido na aba do navegador:',
        codeSnippetWithBlank: `<head>\n  <meta charset="UTF-8">\n  <___>Minha Loja Virtual</___>\n</head>`,
        correctAnswer: 'title',
        options: [
          {
            id: 'opt-2-2-a',
            text: 'title',
            isCorrect: true,
            explanation:
              'Exato! A tag <title> define o nome da página na aba do navegador.',
          },
          {
            id: 'opt-2-2-b',
            text: 'h1',
            isCorrect: false,
            explanation:
              'O <h1> fica dentro do <body> e aparece na página, não na aba.',
          },
          {
            id: 'opt-2-2-c',
            text: 'header',
            isCorrect: false,
            explanation:
              '<header> é uma tag para o cabeçalho no corpo da página.',
          },
          {
            id: 'opt-2-2-d',
            text: 'tab-name',
            isCorrect: false,
            explanation:
              'Essa tag não existe no HTML.',
          },
        ],
        correctOptionId: 'opt-2-2-a',
        explanationOnCorrect:
          'Muito bem! A tag <title> define o nome da página na aba do navegador.',
        explanationOnIncorrect:
          'Dica: em inglês, título é "title". A tag é <title>.',
        xpReward: 20,
      },
    ],
  },
};
