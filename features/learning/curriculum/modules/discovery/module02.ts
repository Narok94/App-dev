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
  tagline: 'O esqueleto sagrado de toda página',
  description:
    'Compreenda como o navegador interpreta um documento web através de <!DOCTYPE html>, <html>, <head> e <body>, dominando os metadados essenciais.',
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
    subtitle: 'Compreenda a trindade que faz qualquer navegador entender seu código',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-2-1-concept',
        type: 'concept',
        title: 'A Anatomia do Documento',
        conceptText:
          'Todo arquivo HTML moderno começa com um anúncio solene para o navegador:\n<!DOCTYPE html>\nEssa declaração simples informa ao navegador que estamos usando a versão mais recente e moderna (HTML5).\n\nEm seguida, temos a raiz de tudo: a tag <html> (com o atributo lang="pt-BR").\n\nDentro dela vivem dois grandes reinos:\n1. <head>: os bastidores técnicos (título da aba, configurações, codificação);\n2. <body>: todo o conteúdo visual que o usuário vê e interage na tela!',
        codeSnippet: `<!DOCTYPE html>\n<html lang="pt-BR">\n  <head>\n    <title>Meu Portal</title>\n  </head>\n  <body>\n    <h1>Bem-vindo!</h1>\n  </body>\n</html>`,
        tatuTip:
          'Nunca coloque títulos ou textos visíveis soltos dentro do <head>. O <head> é para informações sobre o documento; o <body> é para o que aparece na tela!',
        xpReward: 15,
      },
      {
        id: 'step-2-1-completion',
        type: 'code_completion',
        title: 'Completar Código: A Tag Raiz',
        question: 'Qual tag envolve todo o documento HTML logo após o <!DOCTYPE html>?',
        codeSnippetWithBlank: `<!DOCTYPE html>\n<___ lang="pt-BR">\n  <head><title>App</title></head>\n  <body><p>Conteúdo</p></body>\n</___>`,
        correctAnswer: 'html',
        options: [
          {
            id: 'opt-2-1-a',
            text: 'html',
            isCorrect: true,
            explanation:
              'Perfeito! A tag <html> é o elemento raiz que abraça todo o <head> e o <body> do documento.',
          },
          {
            id: 'opt-2-1-b',
            text: 'body',
            isCorrect: false,
            explanation:
              'O <body> fica dentro do <html>, ele não pode conter o <head>.',
          },
          {
            id: 'opt-2-1-c',
            text: 'main',
            isCorrect: false,
            explanation:
              '<main> é usado apenas dentro do <body> para o conteúdo principal.',
          },
          {
            id: 'opt-2-1-d',
            text: 'page',
            isCorrect: false,
            explanation:
              'A tag <page> não existe no padrão oficial do HTML.',
          },
        ],
        correctOptionId: 'opt-2-1-a',
        explanationOnCorrect:
          'Excelente! Você fixou a tag raiz: <html> é a mãe de todos os nós visíveis e invisíveis da página.',
        explanationOnIncorrect:
          'Lembre-se: o elemento que abraça todo o documento após o doctype é sempre o <html>.',
        xpReward: 20,
      },
      {
        id: 'step-2-1-fix',
        type: 'code_fix',
        title: 'Correção de Bug: O Esqueleto Invertido',
        question: 'O código abaixo foi montado fora de ordem por um novato. Identifique a correção necessária:',
        brokenCode: `<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Conteúdo</h1>\n  </body>\n  <head>\n    <title>Minha Página</title>\n  </head>\n</html>`,
        fixedCode: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Minha Página</title>\n  </head>\n  <body>\n    <h1>Conteúdo</h1>\n  </body>\n</html>`,
        options: [
          {
            id: 'opt-fix-2-1-a',
            text: 'O <head> deve vir antes do <body> dentro do elemento <html>.',
            isCorrect: true,
            explanation:
              'Exato! A ordem arquitetural padrão do HTML é sempre primeiro o <head> (metadados) e depois o <body> (conteúdo visual).',
          },
          {
            id: 'opt-fix-2-1-b',
            text: 'Devemos remover a tag <body> para o código compilar.',
            isCorrect: false,
            explanation:
              'O <body> é fundamental para exibir o conteúdo na tela, não podemos removê-lo.',
          },
          {
            id: 'opt-fix-2-1-c',
            text: 'O <!DOCTYPE html> deveria estar dentro do <body>.',
            isCorrect: false,
            explanation:
              'O doctype deve obrigatoriamente estar na primeira linha absoluta do documento.',
          },
        ],
        correctOptionId: 'opt-fix-2-1-a',
        explanationOnCorrect:
          'Ordem reestabelecida! Primeiro pensamos na cabeça (<head>), depois no corpo (<body>).',
        explanationOnIncorrect:
          'Observe a posição das duas grandes tags: o <head> foi colocado depois do <body> por engano!',
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
    subtitle: 'Domine a tag <title>, o charset UTF-8 e a viewport para celulares',
    estimatedMinutes: 4,
    totalXp: 50,
    steps: [
      {
        id: 'step-2-2-concept',
        type: 'concept',
        title: 'O Cérebro da Página: <head>',
        conceptText:
          'O elemento <head> guarda instruções vitais para o navegador e mecanismos de busca:\n\n1. <meta charset="UTF-8">: garante que acentos da língua portuguesa (como á, ç, ã) e emojis sejam renderizados com perfeição, sem caracteres estranhos.\n\n2. <meta name="viewport" content="width=device-width, initial-scale=1.0">: diz ao celular para ajustar a largura da página à tela do aparelho, impedindo que ela fique microscópica.\n\n3. <title>: o texto oficial que aparece na aba do navegador e nos resultados de busca do Google.',
        codeSnippet: `<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>App-dev | Aprenda HTML</title>\n</head>`,
        tatuTip:
          'O <title> é um dos fatores mais importantes de SEO (otimização para o Google) de toda a web. Escolha títulos claros e descritivos!',
        xpReward: 15,
      },
      {
        id: 'step-2-2-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: Renderização de Acentos',
        question: 'A tag <meta charset="UTF-8"> é responsável por garantir que acentos, caracteres especiais e emojis sejam exibidos corretamente.',
        isTrue: true,
        options: [
          {
            id: 'opt-tf-v',
            text: 'Verdadeiro',
            isCorrect: true,
            explanation:
              'Correto! UTF-8 é o padrão universal de codificação de caracteres que suporta todos os alfabetos e símbolos.',
          },
          {
            id: 'opt-tf-f',
            text: 'Falso',
            isCorrect: false,
            explanation:
              'Incorreto. Sem UTF-8, palavras como "Atenção" poderiam aparecer como "Ateno".',
          },
        ],
        correctOptionId: 'opt-tf-v',
        explanationOnCorrect:
          'Perfeito! UTF-8 é indispensável em 100% dos sites modernos.',
        explanationOnIncorrect:
          'Lembre-se: charset="UTF-8" é a blindagem contra erros de acentuação e caracteres corrompidos.',
        xpReward: 15,
      },
      {
        id: 'step-2-2-completion',
        type: 'code_completion',
        title: 'Completar Código: Título da Aba',
        question: 'Complete a tag responsável por definir o título exibido na aba do navegador:',
        codeSnippetWithBlank: `<head>\n  <meta charset="UTF-8">\n  <___>Minha Loja Virtual</___>\n</head>`,
        correctAnswer: 'title',
        options: [
          {
            id: 'opt-2-2-a',
            text: 'title',
            isCorrect: true,
            explanation:
              'Exato! A tag <title> define o nome do documento na aba do navegador.',
          },
          {
            id: 'opt-2-2-b',
            text: 'h1',
            isCorrect: false,
            explanation:
              'O <h1> fica dentro do <body> e aparece como título na página, não na aba.',
          },
          {
            id: 'opt-2-2-c',
            text: 'header',
            isCorrect: false,
            explanation:
              '<header> é um container semântico do corpo da página.',
          },
          {
            id: 'opt-2-2-d',
            text: 'tab-name',
            isCorrect: false,
            explanation:
              'Essa tag não existe na especificação HTML.',
          },
        ],
        correctOptionId: 'opt-2-2-a',
        explanationOnCorrect:
          'Brilhante! <title> dentro de <head> batiza a página com autoridade.',
        explanationOnIncorrect:
          'Dica: em inglês, "título" é title. Essa é a tag exata: <title>.',
        xpReward: 20,
      },
    ],
  },
};
