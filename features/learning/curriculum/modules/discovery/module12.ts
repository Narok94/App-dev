import { LearningModule, Quest } from '@/types/learning';

/**
 * Módulo 12: HTML para o Mundo Real
 * Pertencente à: Era da Descoberta (HTML)
 * Conclusão da Trilha de HTML e desbloqueio da Era da Construção — CSS
 */
export const MODULE_12_MUNDO_REAL: LearningModule = {
  id: 'html-mod-12',
  eraId: 'era-descoberta',
  order: 12,
  title: 'HTML para o Mundo Real',
  tagline: 'A grande síntese: seu Primeiro Artefato na Web',
  description:
    'Consolide cada conceito aprendido em uma prova prática definitiva: construa seu Primeiro Artefato completo com estrutura, semântica, mídia, tabelas, formulários acessíveis e metadados profissionais.',
  status: 'locked',
  xpReward: 160,
  iconName: 'sparkles',
  estimatedMinutes: 10,
  lessons: [
    {
      id: 'quest-html-12-1',
      title: 'O Enigma da Arquitetura Completa',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-12-2',
      title: 'O Primeiro Artefato: A Grande Obra HTML',
      durationMinutes: 6,
      isCompleted: false,
      type: 'quest',
    },
  ],
};

export const MODULE_12_QUESTS: Record<string, Quest> = {
  'quest-html-12-1': {
    id: 'quest-html-12-1',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-12',
    moduleOrder: 12,
    moduleTitle: 'HTML para o Mundo Real',
    title: 'O Enigma da Arquitetura Completa',
    subtitle: 'Revisão ativa integradora: alinhe as camadas essenciais de uma aplicação moderna',
    estimatedMinutes: 4,
    totalXp: 70,
    steps: [
      {
        id: 'step-12-1-concept',
        type: 'concept',
        title: 'A Grande Síntese',
        conceptText:
          'Parabéns por chegar até aqui! Você percorreu um caminho extraordinário:\n\n1. Doctype & Raiz: <!DOCTYPE html> e <html lang="pt-BR">\n2. Metadados & SEO: <head> com charset, viewport, title e Open Graph\n3. Landmarks Semânticos: <header>, <nav>, <main>, <footer>\n4. Conteúdo Rico: <article>, <section>, títulos h1..h6 sem saltos\n5. Dados & Mídia: <img> com alt descritivo, <table> estruturada com thead/scope\n6. Coleta Acessível: <form> com pares label for e input id com validação required\n\nAgora, vamos colocar essa orquestra inteira para tocar em uníssono!',
        codeSnippet: `<!DOCTYPE html>\n<html lang="pt-BR">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Portal do Explorador</title>\n  </head>\n  <body>\n    <header><nav>...</nav></header>\n    <main><article>...</article></main>\n    <footer>...</footer>\n  </body>\n</html>`,
        tatuTip:
          'Um verdadeiro mestre do HTML não apenas sabe escrever código que o navegador entende; ele escreve código que humanos, robôs do Google e tecnologias assistivas leem com perfeição.',
        xpReward: 15,
      },
      {
        id: 'step-12-1-ordering',
        type: 'ordering',
        title: 'Ordenação de Código: A Hierarquia da Vida Web',
        question: 'Qual é a sequência arquitetural exata dos elementos estruturais de nível superior dentro do <body>?',
        codeSnippetWithBlank: `<body>\n  <___> ... </___>\n  <___> ... </___>\n  <___> ... </___>\n</body>`,
        options: [
          {
            id: 'opt-header-main-footer',
            text: '<header> (topo com logo e nav), <main> (conteúdo central único) e <footer> (rodapé institucional)',
            isCorrect: true,
            explanation:
              'Correto! Essa é a trindade estrutural dos landmarks do HTML5 moderno.',
          },
          {
            id: 'opt-footer-main-header',
            text: '<footer> primeiro, depois <main> e por último <header>',
            isCorrect: false,
            explanation:
              'O cabeçalho <header> vem sempre no topo do documento.',
          },
          {
            id: 'opt-main-head-body',
            text: '<main> primeiro, depois <head> e depois <body>',
            isCorrect: false,
            explanation:
              'O <head> fica fora do <body> e nunca dentro dele.',
          },
        ],
        correctOptionId: 'opt-header-main-footer',
        explanationOnCorrect:
          'Arquitetura sagrada confirmada! Header, Main e Footer sustentam o templo da web moderna.',
        explanationOnIncorrect:
          'A ordem natural do fluxo é: topo (<header>) -> centro (<main>) -> base (<footer>).',
        xpReward: 25,
      },
      {
        id: 'step-12-1-fix',
        type: 'code_fix',
        title: 'Correção de Bug: O Código sem Padrões',
        question: 'Analise o trecho abaixo e identifique a correção indispensável para atender aos padrões profissionais:',
        brokenCode: `<html lang="pt-BR">\n  <head><title>App</title></head>\n  <body>\n    <main>\n      <img src="foto.jpg">\n      <form action="/enviar">\n        <input type="text" placeholder="Nome">\n      </form>\n    </main>\n  </body>\n</html>`,
        fixedCode: `<html lang="pt-BR">\n  <head><title>App</title></head>\n  <body>\n    <main>\n      <img src="foto.jpg" alt="Foto demonstrativa do aplicativo">\n      <form action="/enviar" method="POST">\n        <label for="campo-nome">Nome:</label>\n        <input type="text" id="campo-nome" name="nome" required>\n      </form>\n    </main>\n  </body>\n</html>`,
        options: [
          {
            id: 'opt-fix-12-1-a',
            text: 'Adicionar alt na imagem e associar um <label for="id"> com id correspondente no input com validação.',
            isCorrect: true,
            explanation:
              'Perfeito! O código original violava acessibilidade básica com imagem sem alt e campo de formulário desprovido de label associado.',
          },
          {
            id: 'opt-fix-12-1-b',
            text: 'Substituir o elemento <main> por três tags <div> vazias.',
            isCorrect: false,
            explanation:
              'Isso destruiria a semântica sem resolver a ausência do alt ou do label.',
          },
          {
            id: 'opt-fix-12-1-c',
            text: 'Apagar o formulário inteiro.',
            isCorrect: false,
            explanation:
              'O formulário é necessário para a funcionalidade do site.',
          },
        ],
        correctOptionId: 'opt-fix-12-1-a',
        explanationOnCorrect:
          'Visão de arquiteto sênior! Você transformou um código frágil em uma estrutura robusta e acessível.',
        explanationOnIncorrect:
          'Atenção às regras de acessibilidade: imagens precisam de alt e inputs precisam de labels vinculados com for/id.',
        xpReward: 30,
      },
    ],
  },

  'quest-html-12-2': {
    id: 'quest-html-12-2',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-12',
    moduleOrder: 12,
    moduleTitle: 'HTML para o Mundo Real',
    title: 'O Primeiro Artefato: A Grande Obra HTML',
    subtitle: 'A Prova Prática da Era da Descoberta: construa a página definitiva',
    estimatedMinutes: 6,
    totalXp: 90,
    steps: [
      {
        id: 'step-12-2-concept',
        type: 'concept',
        title: 'Sua Prova Prática: O Primeiro Artefato',
        conceptText:
          'Chegou o momento da sua Grande Obra na Era da Descoberta!\n\nEm vez de um quiz teórico, você foi contratado para arquitetar a página principal do portal "Tatu Explorer: O Guia Oficial da Web".\n\nSua missão prática requer a integração harmoniosa de todos os pilares que aprendeu:\n• Esqueleto oficial com doctype e lang="pt-BR"\n• Metadados no head com charset UTF-8, viewport e title\n• Header com título principal <h1> e navegação <nav>\n• Main com <article> de conteúdo e imagem acessível (com alt, width e height)\n• Tabela de dados tabulares com caption, thead e scope="col"\n• Formulário de inscrição com label vinculado por for/id, input validado com required e botão submit\n• Footer com direitos autorais e links de contato.',
        codeSnippet: `<!-- O Primeiro Artefato: Modelo de Referência Profissional -->\n<!DOCTYPE html>\n<html lang="pt-BR">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Tatu Explorer | Guia Web</title>\n  </head>\n  <body>\n    <header>\n      <h1>Tatu Explorer</h1>\n      <nav><a href="#artigo">Artigo</a> <a href="#contato">Contato</a></nav>\n    </header>\n    <main>\n      <article id="artigo">\n        <h2>A Jornada do Conhecimento</h2>\n        <p>A Web foi construída sobre os ombros de padrões abertos e acessíveis.</p>\n      </article>\n    </main>\n    <footer><p>&copy; 2026 App-dev</p></footer>\n  </body>\n</html>`,
        tatuTip:
          'Respire fundo e concentre-se. Ao concluir esta prova prática, você conquistará a Era da Descoberta e desbloqueará a Era da Construção — CSS!',
        xpReward: 20,
      },
      {
        id: 'step-12-2-challenge-1',
        type: 'practical_challenge',
        title: 'Desafio de Construção: Integrando o Artigo & Formulário',
        question: 'Qual bloco de código representa a integração perfeita entre a semântica de artigo, imagem acessível e formulário com par label/input?',
        codeSnippetWithBlank: `<main>\n  <article>\n    <h2>A Revolução da Web</h2>\n    <img src="banner.jpg" alt="Mundo conectado por linhas luminosas" width="600" height="300">\n    <p>Conectando bilhões de pessoas com padrões abertos.</p>\n  </article>\n  \n  <form action="/participar" method="POST">\n    <___ for="email-aluno">Inscreva-se:</___>\n    <input type="email" id="email-aluno" name="email" required>\n    <button type="submit">Garantir Vaga</button>\n  </form>\n</main>`,
        correctAnswer: 'label',
        options: [
          {
            id: 'opt-chal-label',
            text: '<label for="email-aluno">...</label>',
            isCorrect: true,
            explanation:
              'Perfeito! A tag <label> com o atributo for idêntico ao id do campo fecha a tríade sagrada de acessibilidade e usabilidade.',
          },
          {
            id: 'opt-chal-span',
            text: '<span class="label">...</span>',
            isCorrect: false,
            explanation:
              'A tag <span> não possui associação semântica nem transfere o clique para o campo de input.',
          },
          {
            id: 'opt-chal-p',
            text: '<p for="email-aluno">...</p>',
            isCorrect: false,
            explanation:
              'O elemento <p> não suporta nativamente o atributo "for" para controle de formulário.',
          },
        ],
        correctOptionId: 'opt-chal-label',
        explanationOnCorrect:
          'Excelente! O formulário agora está 100% calibrado, acessível e pronto para coletar inscrições.',
        explanationOnIncorrect:
          'Para rotular campos de formulário associados com "for", use sempre <label>.',
        xpReward: 35,
      },
      {
        id: 'step-12-2-challenge-2',
        type: 'practical_challenge',
        title: 'Desafio Final da Era: A Chave da Conquista',
        question: 'Para selar seu Primeiro Artefato e validar sua aptidão para ingressar na Era da Construção (CSS), complete a declaração que garante a interpretação moderna e o idioma de acessibilidade na raiz:',
        codeSnippetWithBlank: `<!DOCTYPE html>\n<html ___="pt-BR">\n  <head>\n    <meta charset="UTF-8">\n    <title>A Grande Obra Completa</title>\n  </head>\n  <body>\n    <!-- Documento Semântico Pleno -->\n  </body>\n</html>`,
        correctAnswer: 'lang',
        options: [
          {
            id: 'opt-artefato-lang',
            text: 'lang="pt-BR"',
            isCorrect: true,
            explanation:
              'Vitória absoluta! lang="pt-BR" define o idioma oficial para motores de busca, navegadores e ferramentas de acessibilidade universal.',
          },
          {
            id: 'opt-artefato-language',
            text: 'language="pt-BR"',
            isCorrect: false,
            explanation:
              'O atributo oficial da especificação do HTML é "lang", e não "language".',
          },
          {
            id: 'opt-artefato-locale',
            text: 'locale="pt-BR"',
            isCorrect: false,
            explanation:
              '"locale" não é um atributo válido na raiz <html>.',
          },
        ],
        correctOptionId: 'opt-artefato-lang',
        explanationOnCorrect:
          '🎉 O PRIMEIRO ARTEFATO ESTÁ COMPLETO! Você dominou o esqueleto da Web. A Era da Descoberta foi conquistada com louvor!',
        explanationOnIncorrect:
          'O atributo padrão para o idioma da página é lang.',
        xpReward: 35,
      },
    ],
  },
};
