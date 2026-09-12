import { LearningModule, Quest } from '@/types/learning';

/**
 * Módulo 7: Arquitetura Semântica
 * Pertencente à: Era da Descoberta (HTML)
 */
export const MODULE_07_ARQUITETURA_SEMANTICA: LearningModule = {
  id: 'html-mod-7',
  eraId: 'era-descoberta',
  order: 7,
  title: 'Arquitetura Semântica',
  tagline: 'Estruturando a página com semântica',
  description:
    'Aprenda a organizar páginas usando as tags estruturais do HTML5: header, nav, main, article, section, aside e footer.',
  status: 'locked',
  xpReward: 130,
  iconName: 'layout',
  estimatedMinutes: 9,
  lessons: [
    {
      id: 'quest-html-7-1',
      title: 'Estrutura Principal: header, nav, main e footer',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-7-2',
      title: 'Artigos e Seções: article, section e aside',
      durationMinutes: 5,
      isCompleted: false,
      type: 'quest',
    },
  ],
};

export const MODULE_07_QUESTS: Record<string, Quest> = {
  'quest-html-7-1': {
    id: 'quest-html-7-1',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-7',
    moduleOrder: 7,
    moduleTitle: 'Arquitetura Semântica',
    title: 'Estrutura Principal: header, nav, main e footer',
    subtitle: 'Organize as seções principais da página com tags que fazem sentido',
    estimatedMinutes: 4,
    totalXp: 60,
    steps: [
      {
        id: 'step-7-1-concept',
        type: 'concept',
        title: 'As quatro partes fundamentais da página',
        conceptText:
          'No HTML5 temos tags próprias para as regiões principais de qualquer página:\n\n1. <header>: o topo introdutório (geralmente com logotipo, título e menu);\n2. <nav>: a área que reúne os links de navegação principais;\n3. <main>: o conteúdo principal da página (recomenda-se apenas um <main> ativo por página);\n4. <footer>: o rodapé com informações de copyright, links úteis e contatos.',
        codeSnippet: `<body>\n  <header>\n    <h1>Tecnologia do Futuro</h1>\n    <nav>\n      <a href="#inicio">Início</a>\n      <a href="#artigos">Artigos</a>\n    </nav>\n  </header>\n\n  <main>\n    <h2>Últimas Notícias</h2>\n    <p>O ecossistema web moderno evolui a cada dia.</p>\n  </main>\n\n  <footer>\n    <p>&copy; 2026 App-dev. Todos os direitos reservados.</p>\n  </footer>\n</body>`,
        tatuTip:
          'Muitas pessoas usam atalhos no leitor de tela para pular direto para o <main>. Isso economiza tempo e evita ter que ouvir todos os links do menu toda vez que trocam de página!',
        xpReward: 15,
      },
      {
        id: 'step-7-1-completion',
        type: 'code_completion',
        title: 'O conteúdo principal da página',
        question: 'Qual tag semântica deve envolver o conteúdo principal e exclusivo desta página?',
        codeSnippetWithBlank: `<header>\n  <nav><a href="/">Home</a></nav>\n</header>\n\n<___>\n  <h1>Meu Artigo Exclusivo</h1>\n  <p>Conteúdo principal que não se repete no site.</p>\n</___>\n\n<footer><p>Rodapé</p></footer>`,
        correctAnswer: 'main',
        options: [
          {
            id: 'opt-main',
            text: '<main>',
            isCorrect: true,
            explanation:
              'Correto! <main> representa o conteúdo exclusivo e central da página.',
          },
          {
            id: 'opt-content',
            text: '<content>',
            isCorrect: false,
            explanation:
              'A tag <content> não faz parte do HTML padrão. O padrão é <main>.',
          },
          {
            id: 'opt-center',
            text: '<center>',
            isCorrect: false,
            explanation:
              '<center> é uma tag antiga e em desuso; alinhamentos visuais devem ser feitos com CSS.',
          },
        ],
        correctOptionId: 'opt-main',
        explanationOnCorrect:
          'Muito bem! A tag <main> indica o conteúdo principal e exclusivo da página.',
        explanationOnIncorrect:
          'Para o conteúdo principal da página, a tag correta é <main>.',
        xpReward: 20,
      },
      {
        id: 'step-7-1-choice',
        type: 'multiple_choice',
        title: 'Quantos <main> usar por página?',
        question: 'Quantos elementos <main> devem estar ativos em uma página HTML?',
        options: [
          {
            id: 'opt-main-single',
            text: 'Apenas 1, pois ele reúne o conteúdo exclusivo daquele documento.',
            isCorrect: true,
            explanation:
              'Exato! A recomendação oficial é ter apenas um elemento <main> visível por página.',
          },
          {
            id: 'opt-main-many',
            text: 'Um para cada parágrafo de texto.',
            isCorrect: false,
            explanation:
              'Parágrafos usam <p>. Usar vários <main> confunde leitores de tela e a navegação.',
          },
          {
            id: 'opt-main-none',
            text: 'Não é recomendado usar <main> em sites modernos.',
            isCorrect: false,
            explanation:
              'Pelo contrário: o <main> é uma das tags mais recomendadas para acessibilidade.',
          },
        ],
        correctOptionId: 'opt-main-single',
        explanationOnCorrect:
          'Muito bem! Ter apenas um <main> ativo mantém a página organizada e acessível.',
        explanationOnIncorrect:
          'Lembre-se: o conteúdo central de uma página fica em um único <main>.',
        xpReward: 25,
      },
    ],
  },

  'quest-html-7-2': {
    id: 'quest-html-7-2',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-7',
    moduleOrder: 7,
    moduleTitle: 'Arquitetura Semântica',
    title: 'Artigos e Seções: article, section e aside',
    subtitle: 'Entenda quando usar article, section e aside',
    estimatedMinutes: 5,
    totalXp: 60,
    steps: [
      {
        id: 'step-7-2-concept',
        type: 'concept',
        title: 'A diferença entre article e section',
        conceptText:
          'Uma dúvida comum no HTML é quando usar <article> e quando usar <section>:\n\n• <article>: representa um conteúdo independente, que faz sentido sozinho. Pense assim: se você publicar esse bloco separado em outro site ou e-mail, ele continua compreensível? Exemplos: uma notícia, um post de blog ou um comentário.\n\n• <section>: representa uma seção temática dentro de um documento maior (como capítulos de uma página). Geralmente começa com um título (<h2> ou <h3>).\n\n• <aside>: reúne conteúdos secundários ou complementares (como barras laterais, biografias do autor ou links relacionados).',
        codeSnippet: `<main>\n  <!-- Post completo que faz sentido por si só -->\n  <article>\n    <h2>Nova Atualização Disponível</h2>\n    <p>A versão mais recente traz melhorias no desempenho.</p>\n    \n    <!-- Conteúdo complementar ou curiosidade lateral -->\n    <aside>\n      <p>💡 Dica: mantenha seu navegador sempre atualizado.</p>\n    </aside>\n  </article>\n</main>`,
        tatuTip:
          'Não use <section> apenas para criar bordas ou fundos coloridos. Se o bloco não tem um tema ou título claro, use uma <div>.',
        xpReward: 15,
      },
      {
        id: 'step-7-2-fix',
        type: 'code_fix',
        title: 'Melhorando a semântica de um post',
        question: 'O código abaixo usou divs genéricas para um post e para a biografia do autor. Como usar as tags semânticas recomendadas?',
        brokenCode: `<div class="post">\n  <h2>Como Aprender HTML</h2>\n  <p>Texto do artigo...</p>\n  <div class="autor-bio">\n    <p>Sobre o autor: Desenvolvedor web há 10 anos.</p>\n  </div>\n</div>`,
        fixedCode: `<article>\n  <h2>Como Aprender HTML</h2>\n  <p>Texto do artigo...</p>\n  <aside>\n    <p>Sobre o autor: Desenvolvedor web há 10 anos.</p>\n  </aside>\n</article>`,
        options: [
          {
            id: 'opt-fix-7-2-a',
            text: 'Substituir a div do post por <article> e a biografia do autor por <aside>.',
            isCorrect: true,
            explanation:
              'Perfeito! O post é uma unidade com sentido próprio (<article>) e a biografia é um conteúdo complementar (<aside>).',
          },
          {
            id: 'opt-fix-7-2-b',
            text: 'Mudar tudo para tags <span>.',
            isCorrect: false,
            explanation:
              '<span> é um elemento em linha e não serve para estruturar blocos de artigos.',
          },
          {
            id: 'opt-fix-7-2-c',
            text: 'Trocar as divs por tags <header> duplicadas.',
            isCorrect: false,
            explanation:
              '<header> serve para cabeçalhos, não para o conteúdo do post ou bloco lateral.',
          },
        ],
        correctOptionId: 'opt-fix-7-2-a',
        explanationOnCorrect:
          'Boa! Usar <article> e <aside> deixa a estrutura muito mais clara.',
        explanationOnIncorrect:
          'Pense na função de cada um: o texto principal é um <article> e a nota do autor é um <aside>.',
        xpReward: 20,
      },
      {
        id: 'step-7-2-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: posts e comentários',
        question: 'Um post de rede social ou um comentário em um vídeo são exemplos de conteúdos que combinam bem com a tag <article>.',
        isTrue: true,
        options: [
          {
            id: 'opt-art-v',
            text: 'Verdadeiro',
            isCorrect: true,
            explanation:
              'Correto! Posts individuais e comentários fazem sentido por si só, se encaixando na proposta de <article>.',
          },
          {
            id: 'opt-art-f',
            text: 'Falso',
            isCorrect: false,
            explanation:
              'Na verdade é verdadeiro. A especificação do HTML cita posts de fóruns e comentários como exemplos claros de <article>.',
          },
        ],
        correctOptionId: 'opt-art-v',
        explanationOnCorrect:
          'Isso mesmo! Conteúdos que fazem sentido por conta própria, como posts e comentários, usam <article>.',
        explanationOnIncorrect:
          'Tudo o que puder ser lido e compartilhado de forma independente pode ser marcado com <article>.',
        xpReward: 25,
      },
    ],
  },
};
