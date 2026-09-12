import { LearningModule, Quest } from '@/types/learning';

/**
 * Módulo 4: Portais e Conexões
 * Pertencente à: Era da Descoberta (HTML)
 */
export const MODULE_04_PORTAIS_CONEXOES: LearningModule = {
  id: 'html-mod-4',
  eraId: 'era-descoberta',
  order: 4,
  title: 'Portais e Conexões',
  tagline: 'Como criar links e navegar entre páginas',
  description:
    'Aprenda a criar links com a tag <a>, usar links internos e externos, navegar na mesma página com #id e abrir links com segurança.',
  status: 'locked',
  xpReward: 120,
  iconName: 'link',
  estimatedMinutes: 8,
  lessons: [
    {
      id: 'quest-html-4-1',
      title: 'Criando Links e Caminhos',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-4-2',
      title: 'Links Internos e Segurança',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
  ],
};

export const MODULE_04_QUESTS: Record<string, Quest> = {
  'quest-html-4-1': {
    id: 'quest-html-4-1',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-4',
    moduleOrder: 4,
    moduleTitle: 'Portais e Conexões',
    title: 'Criando Links e Caminhos',
    subtitle: 'Conecte páginas através da tag <a> e do atributo href',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-4-1-concept',
        type: 'concept',
        title: 'Como funcionam os links',
        conceptText:
          'O "H" de HTML vem de Hipertexto: textos que podem levar a outras páginas.\n\nPara criar um link, usamos a tag <a> (de âncora) com o atributo href (o destino do link).\n\nExistem dois tipos principais de destino:\n1. Links externos: apontam para qualquer site na internet (ex: href="https://developer.mozilla.org");\n2. Links internos: apontam para arquivos do seu próprio projeto (ex: href="sobre.html").',
        codeSnippet: `<!-- Link para página interna do seu site -->\n<a href="sobre.html">Conheça nossa história</a>\n\n<!-- Link para site externo completo -->\n<a href="https://w3c.org">Visite o site da W3C</a>`,
        tatuTip:
          'O texto do link deve ser claro e informativo. Em vez de "Clique aqui", prefira "Leia o guia completo de HTML". Isso ajuda muito na acessibilidade e na leitura!',
        xpReward: 15,
      },
      {
        id: 'step-4-1-completion',
        type: 'code_completion',
        title: 'Destino do link',
        question: 'Qual atributo define o endereço para onde o link deve apontar?',
        codeSnippetWithBlank: `<a ___="contato.html">Fale Conosco</a>`,
        correctAnswer: 'href',
        options: [
          {
            id: 'opt-comp-href',
            text: 'href',
            isCorrect: true,
            explanation:
              'Correto! "href" vem de Hypertext Reference e indica para onde o link vai levar.',
          },
          {
            id: 'opt-comp-src',
            text: 'src',
            isCorrect: false,
            explanation:
              'O atributo "src" é usado em imagens e vídeos para carregar arquivos, não em links <a>.',
          },
          {
            id: 'opt-comp-link',
            text: 'link',
            isCorrect: false,
            explanation:
              'Não existe o atributo link="" em tags <a>. O atributo padrão é href="".',
          },
          {
            id: 'opt-comp-to',
            text: 'to',
            isCorrect: false,
            explanation:
              '"to" é usado em algumas bibliotecas como React Router, mas no HTML padrão usamos href="".',
          },
        ],
        correctOptionId: 'opt-comp-href',
        explanationOnCorrect:
          'Muito bem! O atributo href define para onde o link aponta.',
        explanationOnIncorrect:
          'Para links, o atributo correto é href.',
        xpReward: 20,
      },
      {
        id: 'step-4-1-fix',
        type: 'code_fix',
        title: 'Corrija o atributo do link',
        question: 'O link abaixo não está funcionando. Qual é a correção correta?',
        brokenCode: `<a src="cursos.html">Nossos Cursos</a>`,
        fixedCode: `<a href="cursos.html">Nossos Cursos</a>`,
        options: [
          {
            id: 'opt-fix-4-1-a',
            text: 'Trocar o atributo src por href, pois links usam href para indicar o destino.',
            isCorrect: true,
            explanation:
              'Perfeito! O atributo src serve para carregar mídias (como imagens); links usam href.',
          },
          {
            id: 'opt-fix-4-1-b',
            text: 'Trocar a tag <a> por uma tag <button>.',
            isCorrect: false,
            explanation:
              'Para navegar entre páginas, a tag recomendada é <a>.',
          },
          {
            id: 'opt-fix-4-1-c',
            text: 'Adicionar uma barra no final: <a src="cursos.html"/>.',
            isCorrect: false,
            explanation:
              'A tag <a> não fecha nela mesma; ela envolve o texto do link e fecha com </a>.',
          },
        ],
        correctOptionId: 'opt-fix-4-1-a',
        explanationOnCorrect:
          'Boa! Agora o navegador sabe para onde ir quando alguém clicar no link.',
        explanationOnIncorrect:
          'Lembre-se: em tags <a>, o endereço de destino fica no atributo href.',
        xpReward: 20,
      },
    ],
  },

  'quest-html-4-2': {
    id: 'quest-html-4-2',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-4',
    moduleOrder: 4,
    moduleTitle: 'Portais e Conexões',
    title: 'Links Internos e Segurança',
    subtitle: 'Navegue na mesma página com #id e abra abas com rel="noopener"',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-4-2-concept',
        type: 'concept',
        title: 'Navegação na mesma página e links externos',
        conceptText:
          'Links também servem para navegar na própria página ou abrir novas abas:\n\n1. Pular para uma seção da mesma página:\nVocê pode levar o usuário até uma parte da tela usando a hashtag (#) com o id da seção:\n<a href="#depoimentos">Ver Depoimentos</a>\n...\n<section id="depoimentos">...\n\n2. Abrir em nova aba com segurança:\nPara abrir um link em outra aba, usamos target="_blank". Sempre que fizer isso, adicione rel="noopener noreferrer" para evitar problemas de segurança entre a página de origem e o destino.',
        codeSnippet: `<!-- Salto na mesma página -->\n<a href="#rodape">Ir ao Rodapé</a>\n\n<!-- Nova aba com segurança -->\n<a href="https://github.com" target="_blank" rel="noopener noreferrer">Acessar GitHub</a>`,
        tatuTip:
          'Você também pode criar links para enviar e-mail com href="mailto:contato@site.com" ou ligar no celular com href="tel:+5511999999999"!',
        xpReward: 15,
      },
      {
        id: 'step-4-2-challenge',
        type: 'practical_challenge',
        title: 'Link para seção da página',
        question: 'Qual valor devemos colocar no href para rolar a página diretamente até a tag com id="galeria"?',
        codeSnippetWithBlank: `<a href="___">Ver Galeria de Fotos</a>\n\n<div id="galeria">\n  <h2>Nossas Fotos</h2>\n</div>`,
        correctAnswer: '#galeria',
        options: [
          {
            id: 'opt-hash-galeria',
            text: '#galeria',
            isCorrect: true,
            explanation:
              'Exatamente! O sinal # avisa que queremos pular para o elemento com aquele id na mesma página (#galeria).',
          },
          {
            id: 'opt-point-galeria',
            text: '.galeria',
            isCorrect: false,
            explanation:
              'O ponto (.) é usado para classes no CSS. Em links HTML, usamos a hashtag # para buscar o id.',
          },
          {
            id: 'opt-plain-galeria',
            text: 'galeria.html',
            isCorrect: false,
            explanation:
              'Isso abriria uma nova página chamada galeria.html em vez de rolar até a seção na página atual.',
          },
          {
            id: 'opt-at-galeria',
            text: '@galeria',
            isCorrect: false,
            explanation:
              'O símbolo @ não é usado para links de âncora no HTML.',
          },
        ],
        correctOptionId: 'opt-hash-galeria',
        explanationOnCorrect:
          'Exato! Com #galeria, o navegador pula direto para a seção com aquele id.',
        explanationOnIncorrect:
          'Para links na mesma página, usamos a hashtag antes do id: #id.',
        xpReward: 20,
      },
      {
        id: 'step-4-2-choice',
        type: 'multiple_choice',
        title: 'Segurança em links externos',
        question: 'Ao usar target="_blank" para abrir um site externo, por que é recomendável adicionar rel="noopener noreferrer"?',
        options: [
          {
            id: 'opt-sec-protect',
            text: 'Por segurança e privacidade, impedindo que a nova página acesse dados da aba anterior.',
            isCorrect: true,
            explanation:
              'Correto! rel="noopener noreferrer" protege contra acessos indesejados entre a página antiga e a nova aba.',
          },
          {
            id: 'opt-sec-faster',
            text: 'Para reduzir o consumo de memória pela metade.',
            isCorrect: false,
            explanation:
              'Ele não reduz o uso de memória; o foco é proteger a segurança da navegação.',
          },
          {
            id: 'opt-sec-color',
            text: 'Apenas para mudar a cor do link na tela.',
            isCorrect: false,
            explanation:
              'A cor do link é definida com CSS. O atributo rel é focado em segurança e relação do link.',
          },
        ],
        correctOptionId: 'opt-sec-protect',
        explanationOnCorrect:
          'Muito bem! Usar rel="noopener noreferrer" protege o usuário ao abrir links externos.',
        explanationOnIncorrect:
          'Sempre que usar target="_blank", é boa prática de segurança incluir rel="noopener noreferrer".',
        xpReward: 20,
      },
    ],
  },
};
