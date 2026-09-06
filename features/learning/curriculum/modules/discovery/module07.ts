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
  tagline: 'A planta arquitetônica do HTML5 moderno',
  description:
    'Estruture páginas com sentido pleno usando landmarks do HTML5: header, nav, main, article, section, aside e footer, elevando seu código ao nível profissional.',
  status: 'locked',
  xpReward: 130,
  iconName: 'layout',
  estimatedMinutes: 9,
  lessons: [
    {
      id: 'quest-html-7-1',
      title: 'O Esqueleto Vivo: header, nav, main & footer',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-7-2',
      title: 'Artigos & Seções: article vs section vs aside',
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
    title: 'O Esqueleto Vivo: header, nav, main & footer',
    subtitle: 'Mapeie as grandes regiões estruturais que todo leitor de tela e mecanismo de busca procura',
    estimatedMinutes: 4,
    totalXp: 60,
    steps: [
      {
        id: 'step-7-1-concept',
        type: 'concept',
        title: 'As Quatro Regiões Mestras (Landmarks)',
        conceptText:
          'Antes do HTML5, páginas eram uma sopa confusa de <div id="topo">, <div id="menu"> e <div id="baixo">.\n\nO HTML5 introduziu tags semânticas universais chamadas "Landmarks":\n\n1. <header>: o topo introdutório (contém logotipo, slogan e navegação);\n2. <nav>: bloco de navegação principal contendo links-chave;\n3. <main>: o coração da página! Contém o conteúdo exclusivo e principal daquele documento (deve haver apenas 1 <main> ativo por página);\n4. <footer>: o rodapé com direitos autorais, termos, links institucionais e contatos.',
        codeSnippet: `<body>\n  <header>\n    <h1>Tecnologia do Futuro</h1>\n    <nav>\n      <a href="#inicio">Início</a>\n      <a href="#artigos">Artigos</a>\n    </nav>\n  </header>\n\n  <main>\n    <h2>Últimas Notícias</h2>\n    <p>O ecossistema web moderno evolui a cada dia.</p>\n  </main>\n\n  <footer>\n    <p>&copy; 2026 App-dev. Todos os direitos reservados.</p>\n  </footer>\n</body>`,
        tatuTip:
          'Pessoas que usam leitores de tela têm atalhos de teclado para saltar direto para o <main>, pulando dezenas de links repetidos do menu. Sem <main>, elas precisam ouvir o menu inteiro a cada clique!',
        xpReward: 15,
      },
      {
        id: 'step-7-1-completion',
        type: 'code_completion',
        title: 'Completar Código: O Coração do Documento',
        question: 'Qual tag semântica de primeiro nível deve abrigar o conteúdo exclusivo e central desta página?',
        codeSnippetWithBlank: `<header>\n  <nav><a href="/">Home</a></nav>\n</header>\n\n<___>\n  <h1>Meu Artigo Exclusivo</h1>\n  <p>Conteúdo principal que não se repete no site.</p>\n</___>\n\n<footer><p>Rodapé</p></footer>`,
        correctAnswer: 'main',
        options: [
          {
            id: 'opt-main',
            text: '<main>',
            isCorrect: true,
            explanation:
              'Correto! <main> representa o núcleo temático e exclusivo da página atual.',
          },
          {
            id: 'opt-content',
            text: '<content>',
            isCorrect: false,
            explanation:
              'A tag <content> foi um rascunho antigo descartado; o padrão oficial do HTML5 é <main>.',
          },
          {
            id: 'opt-center',
            text: '<center>',
            isCorrect: false,
            explanation:
              '<center> é uma tag obsoleta e banida do HTML moderno; ela nunca deve ser usada.',
          },
        ],
        correctOptionId: 'opt-main',
        explanationOnCorrect:
          'Coração identificado! O elemento <main> estabelece a âncora principal de acessibilidade da página.',
        explanationOnIncorrect:
          'A palavra em inglês para "principal" é main.',
        xpReward: 20,
      },
      {
        id: 'step-7-1-choice',
        type: 'multiple_choice',
        title: 'Missão: A Regra do Main Único',
        question: 'Quantos elementos <main> devem estar ativos e visíveis em uma mesma página HTML?',
        options: [
          {
            id: 'opt-main-single',
            text: 'Apenas 1, pois ele define o conteúdo único e central daquele documento.',
            isCorrect: true,
            explanation:
              'Exato! O padrão da W3C determina que não se deve ter mais de um elemento <main> visível por documento.',
          },
          {
            id: 'opt-main-many',
            text: 'Um para cada parágrafo escrito na tela.',
            isCorrect: false,
            explanation:
              'Parágrafos usam <p>; usar múltiplos <main> confunde totalmente os leitores de tela.',
          },
          {
            id: 'opt-main-none',
            text: 'Não é permitido usar <main> em sites modernos.',
            isCorrect: false,
            explanation:
              'Pelo contrário: o <main> é um dos requisitos mais valiosos de acessibilidade.',
          },
        ],
        correctOptionId: 'opt-main-single',
        explanationOnCorrect:
          'Perfeição arquitetural! Um documento, um único <main> dominante.',
        explanationOnIncorrect:
          'Lembre-se: o conteúdo central é único em cada página.',
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
    title: 'Artigos & Seções: article vs section vs aside',
    subtitle: 'Aprenda a discernir conteúdos autônomos de divisões temáticas e laterais',
    estimatedMinutes: 5,
    totalXp: 60,
    steps: [
      {
        id: 'step-7-2-concept',
        type: 'concept',
        title: 'O Teste do Jornal: Article vs Section',
        conceptText:
          'Uma das dúvidas mais clássicas do desenvolvimento web é a diferença entre <article> e <section>:\n\n• <article>: representa um conteúdo completo e independente. O "teste do leitor de RSS": se você recortar esse bloco e publicar sozinho em outro site, feed de notícias ou e-mail, ele ainda faz sentido completo? Exemplos: post de blog, comentário de usuário, notícia, review de produto.\n\n• <section>: representa uma divisão temática de um documento maior (como capítulos). Quase sempre começa com um título (<h2> ou <h3>).\n\n• <aside>: representa conteúdo tangencial ou periférico (barras laterais, citações em destaque, caixas de curiosidade, links relacionados).',
        codeSnippet: `<main>\n  <!-- Notícia completa que faz sentido sozinha -->\n  <article>\n    <h2>Lançada Nova Versão do Navegador</h2>\n    <p>Novos recursos trazem mais velocidade e privacidade.</p>\n    \n    <!-- Conteúdo complementar ou curiosidade lateral -->\n    <aside>\n      <p>💡 Curiosidade: o primeiro navegador foi criado em 1990.</p>\n    </aside>\n  </article>\n</main>`,
        tatuTip:
          'Não use <section> simplesmente para aplicar bordas ou cores no CSS. Se o bloco não tiver um tema claro e um título, use uma <div>.',
        xpReward: 15,
      },
      {
        id: 'step-7-2-fix',
        type: 'code_fix',
        title: 'Correção de Bug: O Blog Sem Semântica',
        question: 'O código abaixo usou divs genéricas para um post de blog com barra lateral de autor. Como aplicar semântica moderna?',
        brokenCode: `<div class="post">\n  <h2>Como Aprender HTML</h2>\n  <p>Texto do artigo...</p>\n  <div class="autor-bio">\n    <p>Sobre o autor: Desenvolvedor web há 10 anos.</p>\n  </div>\n</div>`,
        fixedCode: `<article>\n  <h2>Como Aprender HTML</h2>\n  <p>Texto do artigo...</p>\n  <aside>\n    <p>Sobre o autor: Desenvolvedor web há 10 anos.</p>\n  </aside>\n</article>`,
        options: [
          {
            id: 'opt-fix-7-2-a',
            text: 'Substituir a div do post por <article> e a bio lateral por <aside>.',
            isCorrect: true,
            explanation:
              'Perfeito! O post é uma unidade de conteúdo autônoma (<article>) e a biografia do autor é uma nota periférica complementar (<aside>).',
          },
          {
            id: 'opt-fix-7-2-b',
            text: 'Mudar tudo para tags <span>.',
            isCorrect: false,
            explanation:
              '<span> é um elemento inline e quebra toda a estrutura de blocos do post.',
          },
          {
            id: 'opt-fix-7-2-c',
            text: 'Trocar as divs por tags <header> duplicadas.',
            isCorrect: false,
            explanation:
              '<header> serve para cabeçalhos, não para o corpo do artigo ou barra lateral.',
          },
        ],
        correctOptionId: 'opt-fix-7-2-a',
        explanationOnCorrect:
          'Transformação semântica impressionante! O código agora conversa com clareza com qualquer ferramenta da web.',
        explanationOnIncorrect:
          'Pense nas funções: o artigo é um <article> e a nota de autor é um <aside>.',
        xpReward: 20,
      },
      {
        id: 'step-7-2-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: Um Post em um Feed',
        question: 'Um post no Instagram, um tuíte no Twitter ou um comentário em um vídeo do YouTube são exemplos perfeitos de conteúdo que deve ser marcado com a tag <article>.',
        isTrue: true,
        options: [
          {
            id: 'opt-art-v',
            text: 'Verdadeiro',
            isCorrect: true,
            explanation:
              'Correto! Posts individuais e comentários são independentes e auto-contidos, cumprindo à risca a definição canônica de <article>.',
          },
          {
            id: 'opt-art-f',
            text: 'Falso',
            isCorrect: false,
            explanation:
              'Incorreto. A especificação do HTML5 cita expressamente posts de fóruns, tweets e comentários como exemplos de <article>.',
          },
        ],
        correctOptionId: 'opt-art-v',
        explanationOnCorrect:
          'Domínio conceitual total! Você compreende a alma do HTML semântico.',
        explanationOnIncorrect:
          'Qualquer unidade que possa ser compartilhada ou distribuída de forma independente é um <article>.',
        xpReward: 25,
      },
    ],
  },
};
