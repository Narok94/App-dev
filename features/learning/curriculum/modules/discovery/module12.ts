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
  tagline: 'Juntando as peças: seu primeiro projeto completo na Web',
  description:
    'Reúna tudo o que aprendeu em uma atividade prática: monte uma página completa com semântica, imagens, tabelas e formulários.',
  status: 'locked',
  xpReward: 160,
  iconName: 'sparkles',
  estimatedMinutes: 10,
  lessons: [
    {
      id: 'quest-html-12-1',
      title: 'Organizando a Página Completa',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-12-2',
      title: 'Projeto Final: Montando a Página Completa',
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
    title: 'Organizando a Página Completa',
    subtitle: 'Junte os pontos principais da estrutura de uma página real',
    estimatedMinutes: 4,
    totalXp: 70,
    steps: [
      {
        id: 'step-12-1-concept',
        type: 'concept',
        title: 'Revisando a estrutura',
        conceptText:
          'Parabéns por chegar até aqui! Você já construiu uma base sólida:\n\n1. Doctype e Raiz: <!DOCTYPE html> e <html lang="pt-BR">\n2. Metadados e SEO: <head> com charset, viewport, title e Open Graph\n3. Blocos Semânticos: <header>, <nav>, <main> e <footer>\n4. Conteúdo: <article>, <section> e títulos de h1 a h6 na ordem correta\n5. Imagens e Tabelas: <img> com alt descritivo e <table> com thead e scope\n6. Formulários: <form> com pares de label/input e validações como required\n\nAgora vamos juntar essas partes em uma página real!',
        codeSnippet: `<!DOCTYPE html>\n<html lang="pt-BR">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Portal do Explorador</title>\n  </head>\n  <body>\n    <header><nav>...</nav></header>\n    <main><article>...</article></main>\n    <footer>...</footer>\n  </body>\n</html>`,
        tatuTip:
          'Escrever bom HTML é criar código que funcione bem para pessoas, navegadores, buscadores e leitores de tela.',
        xpReward: 15,
      },
      {
        id: 'step-12-1-ordering',
        type: 'ordering',
        title: 'A ordem dos blocos principais',
        question: 'Qual é a sequência natural dos principais blocos semânticos dentro de <body>?',
        codeSnippetWithBlank: `<body>\n  <___> ... </___>\n  <___> ... </___>\n  <___> ... </___>\n</body>`,
        options: [
          {
            id: 'opt-header-main-footer',
            text: '<header> (topo com navegação), <main> (conteúdo principal) e <footer> (rodapé)',
            isCorrect: true,
            explanation:
              'Correto! Essa é a estrutura semântica padrão recomendada pelo HTML5.',
          },
          {
            id: 'opt-footer-main-header',
            text: '<footer> primeiro, depois <main> e por último <header>',
            isCorrect: false,
            explanation:
              'O cabeçalho <header> vem sempre no topo da página.',
          },
          {
            id: 'opt-main-head-body',
            text: '<main> primeiro, depois <head> e depois <body>',
            isCorrect: false,
            explanation:
              'A tag <head> fica fora de <body> e nunca dentro.',
          },
        ],
        correctOptionId: 'opt-header-main-footer',
        explanationOnCorrect:
          'Muito bem! <header>, <main> e <footer> organizam o topo, o centro e o rodapé da página.',
        explanationOnIncorrect:
          'A ordem padrão é: topo (<header>), centro (<main>) e base (<footer>).',
        xpReward: 25,
      },
      {
        id: 'step-12-1-fix',
        type: 'code_fix',
        title: 'Ajustando código para boas práticas',
        question: 'Analise o trecho abaixo e identifique o que precisa ser corrigido para torná-lo acessível:',
        brokenCode: `<html lang="pt-BR">\n  <head><title>App</title></head>\n  <body>\n    <main>\n      <img src="foto.jpg">\n      <form action="/enviar">\n        <input type="text" placeholder="Nome">\n      </form>\n    </main>\n  </body>\n</html>`,
        fixedCode: `<html lang="pt-BR">\n  <head><title>App</title></head>\n  <body>\n    <main>\n      <img src="foto.jpg" alt="Foto demonstrativa do aplicativo">\n      <form action="/enviar" method="POST">\n        <label for="campo-nome">Nome:</label>\n        <input type="text" id="campo-nome" name="nome" required>\n      </form>\n    </main>\n  </body>\n</html>`,
        options: [
          {
            id: 'opt-fix-12-1-a',
            text: 'Adicionar alt na imagem e associar um <label for="id"> com id correspondente no input.',
            isCorrect: true,
            explanation:
              'Perfeito! O código original tinha imagem sem alt e campo de formulário sem rótulo associado.',
          },
          {
            id: 'opt-fix-12-1-b',
            text: 'Substituir a tag <main> por três <div> vazias.',
            isCorrect: false,
            explanation:
              'Isso retiraria o elemento semântico sem resolver a falta de alt e label.',
          },
          {
            id: 'opt-fix-12-1-c',
            text: 'Apagar o formulário inteiro.',
            isCorrect: false,
            explanation:
              'O formulário faz parte do conteúdo da página.',
          },
        ],
        correctOptionId: 'opt-fix-12-1-a',
        explanationOnCorrect:
          'Excelente! Imagem com alt e campos com label tornam a página acessível a todos.',
        explanationOnIncorrect:
          'Lembre-se: imagens pedem alt descritivo e campos de formulário precisam de <label> com for e id.',
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
    title: 'Projeto Final: Montando a Página Completa',
    subtitle: 'Coloque tudo em prática montando uma página do início ao fim',
    estimatedMinutes: 6,
    totalXp: 90,
    steps: [
      {
        id: 'step-12-2-concept',
        type: 'concept',
        title: 'O desafio prático final',
        conceptText:
          'Chegou o momento de juntar tudo o que você aprendeu na Era da Descoberta!\n\nImagine que você vai criar a página inicial de um portal de programação.\n\nSua estrutura vai reunir:\n• Declaração doctype e lang="pt-BR"\n• Cabeçalho <head> com charset, viewport e title\n• Topo <header> com título principal <h1> e navegação <nav>\n• Área central <main> com <article> e imagem com alt\n• Formulário com rótulo <label>, campo <input> validado e botão de envio\n• Rodapé <footer> com informações de contato.',
        codeSnippet: `<!-- Exemplo de estrutura completa -->\n<!DOCTYPE html>\n<html lang="pt-BR">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Tatu Explorer | Guia Web</title>\n  </head>\n  <body>\n    <header>\n      <h1>Tatu Explorer</h1>\n      <nav><a href="#artigo">Artigo</a> <a href="#contato">Contato</a></nav>\n    </header>\n    <main>\n      <article id="artigo">\n        <h2>Primeiros Passos</h2>\n        <p>A Web funciona graças a padrões abertos e acessíveis.</p>\n      </article>\n    </main>\n    <footer><p>&copy; 2026 App-dev</p></footer>\n  </body>\n</html>`,
        tatuTip:
          'Ao completar esta etapa, você conclui a Era da Descoberta e abre as portas para a Era da Construção com CSS!',
        xpReward: 20,
      },
      {
        id: 'step-12-2-challenge-1',
        type: 'practical_challenge',
        title: 'Integrando artigo e formulário',
        question: 'Qual tag completa o formulário fazendo o vínculo de acessibilidade com o campo de texto?',
        codeSnippetWithBlank: `<main>\n  <article>\n    <h2>Novidades da Web</h2>\n    <img src="banner.jpg" alt="Pessoas estudando programação no computador" width="600" height="300">\n    <p>Aprenda na prática e construa seus primeiros projetos.</p>\n  </article>\n  \n  <form action="/participar" method="POST">\n    <___ for="email-aluno">Seu e-mail:</___>\n    <input type="email" id="email-aluno" name="email" required>\n    <button type="submit">Quero participar</button>\n  </form>\n</main>`,
        correctAnswer: 'label',
        options: [
          {
            id: 'opt-chal-label',
            text: '<label for="email-aluno">...</label>',
            isCorrect: true,
            explanation:
              'Perfeito! O <label> com o atributo for apontando para o id do campo fecha a ligação correta de acessibilidade.',
          },
          {
            id: 'opt-chal-span',
            text: '<span class="label">...</span>',
            isCorrect: false,
            explanation:
              'A tag <span> não faz a ligação de acessibilidade nem transfere o foco para o campo.',
          },
          {
            id: 'opt-chal-p',
            text: '<p for="email-aluno">...</p>',
            isCorrect: false,
            explanation:
              'O elemento <p> não tem suporte ao atributo "for" para controle de formulário.',
          },
        ],
        correctOptionId: 'opt-chal-label',
        explanationOnCorrect:
          'Muito bem! O formulário está acessível e pronto para ser usado.',
        explanationOnIncorrect:
          'Para criar rótulos associados a campos via "for", use sempre a tag <label>.',
        xpReward: 35,
      },
      {
        id: 'step-12-2-challenge-2',
        type: 'practical_challenge',
        title: 'O toque final da página',
        question: 'Qual atributo na tag raiz define o idioma oficial da página para navegadores e leitores de tela?',
        codeSnippetWithBlank: `<!DOCTYPE html>\n<html ___="pt-BR">\n  <head>\n    <meta charset="UTF-8">\n    <title>Minha Primeira Página</title>\n  </head>\n  <body>\n    <!-- Conteúdo da página -->\n  </body>\n</html>`,
        correctAnswer: 'lang',
        options: [
          {
            id: 'opt-artefato-lang',
            text: 'lang="pt-BR"',
            isCorrect: true,
            explanation:
              'Correto! lang="pt-BR" informa o idioma para buscadores, navegadores e leitores de tela.',
          },
          {
            id: 'opt-artefato-language',
            text: 'language="pt-BR"',
            isCorrect: false,
            explanation:
              'O atributo oficial no padrão HTML é "lang" e não "language".',
          },
          {
            id: 'opt-artefato-locale',
            text: 'locale="pt-BR"',
            isCorrect: false,
            explanation:
              '"locale" não é um atributo válido na tag <html>.',
          },
        ],
        correctOptionId: 'opt-artefato-lang',
        explanationOnCorrect:
          '🎉 Projeto concluído! Você dominou a estrutura do HTML e completou a Era da Descoberta!',
        explanationOnIncorrect:
          'O atributo padrão para o idioma da página é lang.',
        xpReward: 35,
      },
    ],
  },
};
