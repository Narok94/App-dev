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
  tagline: 'A teia invisível dos hiperlinks',
  description:
    'Aprenda a conectar documentos com a tag âncora <a>, dominando caminhos relativos e absolutos, âncoras na mesma página (#id) e segurança com rel="noopener".',
  status: 'locked',
  xpReward: 120,
  iconName: 'link',
  estimatedMinutes: 8,
  lessons: [
    {
      id: 'quest-html-4-1',
      title: 'A Teia da Web: Links & Caminhos',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-4-2',
      title: 'Portais Seguros & Âncoras Internas',
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
    title: 'A Teia da Web: Links & Caminhos',
    subtitle: 'Conecte páginas através da tag <a> e do atributo href',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-4-1-concept',
        type: 'concept',
        title: 'O Poder do Hiperlink',
        conceptText:
          'O "H" de HTML significa Hipertexto: texto capaz de saltar para outros documentos.\n\nEssa mágica acontece através da tag <a> (âncora) e do seu atributo essencial: href (Hypertext Reference).\n\nExistem dois tipos de destinos principais:\n1. Links Absolutos: apontam para qualquer lugar da web pública (ex: href="https://developer.mozilla.org");\n2. Links Relativos: apontam para outros arquivos dentro da sua própria pasta de projeto (ex: href="sobre.html" ou href="./contato.html").',
        codeSnippet: `<!-- Link para página interna do seu site -->\n<a href="sobre.html">Conheça nossa história</a>\n\n<!-- Link para site externo completo -->\n<a href="https://w3c.org">Visite o consórcio W3C</a>`,
        tatuTip:
          'O texto que fica entre <a> e </a> deve ser descritivo. Evite criar links com o texto genérico "Clique aqui"; prefira "Leia nosso guia completo de HTML". Isso faz toda a diferença para SEO e acessibilidade!',
        xpReward: 15,
      },
      {
        id: 'step-4-1-completion',
        type: 'code_completion',
        title: 'Completar Código: Destino do Link',
        question: 'Complete o atributo que define o endereço de destino para onde o link aponta:',
        codeSnippetWithBlank: `<a ___="contato.html">Fale Conosco</a>`,
        correctAnswer: 'href',
        options: [
          {
            id: 'opt-comp-href',
            text: 'href',
            isCorrect: true,
            explanation:
              'Correto! "href" é a abreviação de Hypertext Reference e é o atributo mandatório do elemento <a>.',
          },
          {
            id: 'opt-comp-src',
            text: 'src',
            isCorrect: false,
            explanation:
              'O atributo "src" (source) é usado em imagens e vídeos para carregar arquivos, não em links <a>.',
          },
          {
            id: 'opt-comp-link',
            text: 'link',
            isCorrect: false,
            explanation:
              'Não existe o atributo link="" em tags <a>. O padrão universal é href="".',
          },
          {
            id: 'opt-comp-to',
            text: 'to',
            isCorrect: false,
            explanation:
              '"to" é usado em bibliotecas como React Router, mas no HTML padrão nativo a tag exige href="".',
          },
        ],
        correctOptionId: 'opt-comp-href',
        explanationOnCorrect:
          'Caminho traçado! O atributo href aponta as coordenadas exatas do hiperlink.',
        explanationOnIncorrect:
          'Abreviação clássica: Hypertext REFerence -> href.',
        xpReward: 20,
      },
      {
        id: 'step-4-1-fix',
        type: 'code_fix',
        title: 'Correção de Bug: Link Sem Destino',
        question: 'Analise o link abaixo que não está levando o usuário a lugar nenhum e aponte o erro:',
        brokenCode: `<a src="cursos.html">Nossos Cursos</a>`,
        fixedCode: `<a href="cursos.html">Nossos Cursos</a>`,
        options: [
          {
            id: 'opt-fix-4-1-a',
            text: 'Trocar o atributo src por href, pois links <a> utilizam href para destinos.',
            isCorrect: true,
            explanation:
              'Perfeito! O atributo src é exclusivo de recursos incorporados (como <img> ou <script>); links <a> usam href.',
          },
          {
            id: 'opt-fix-4-1-b',
            text: 'Trocar a tag <a> por uma tag <button>.',
            isCorrect: false,
            explanation:
              'Para navegar entre páginas web, a tag correta e semântica é <a>.',
          },
          {
            id: 'opt-fix-4-1-c',
            text: 'Adicionar uma barra no final: <a src="cursos.html"/>.',
            isCorrect: false,
            explanation:
              'A tag <a> não é auto-fechável; ela precisa envolver o texto do link e terminar com </a>.',
          },
        ],
        correctOptionId: 'opt-fix-4-1-a',
        explanationOnCorrect:
          'Bug neutralizado! Agora o navegador sabe para onde navegar ao clicar no link.',
        explanationOnIncorrect:
          'Atenção ao nome do atributo: para links é href, e não src!',
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
    title: 'Portais Seguros & Âncoras Internas',
    subtitle: 'Navegue na mesma página com #id e abra abas com rel="noopener"',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-4-2-concept',
        type: 'concept',
        title: 'Saltos Internos e Portais Seguros',
        conceptText:
          'Links são capazes de muito mais do que apenas mudar de página:\n\n1. Âncoras na Mesma Página:\nVocê pode fazer o usuário deslizar diretamente até uma seção específica usando a cerquilha (#) combinada com o atributo id do destino:\n<a href="#depoimentos">Ver Depoimentos</a>\n...\n<section id="depoimentos">...\n\n2. Abrir em Nova Aba com Segurança Máxima:\nPara abrir um link externo em uma nova aba do navegador, usamos target="_blank". Porém, SEMPRE que usar target="_blank", adicione rel="noopener noreferrer" para evitar que a nova página tenha acesso ao seu site (proteção contra tabnabbing).',
        codeSnippet: `<!-- Salto na mesma página -->\n<a href="#rodape">Ir ao Rodapé</a>\n\n<!-- Nova aba com blindagem de segurança -->\n<a href="https://github.com" target="_blank" rel="noopener noreferrer">Acessar GitHub</a>`,
        tatuTip:
          'Você também pode criar links para disparar e-mail nativo com href="mailto:contato@app.dev" ou ligação telefônica em smartphones com href="tel:+5511999999999"!',
        xpReward: 15,
      },
      {
        id: 'step-4-2-challenge',
        type: 'practical_challenge',
        title: 'Desafio Prático: Conectando a Âncora Interna',
        question: 'Qual valor deve ser colocado no href do link para que ele salte diretamente para o elemento <div id="galeria">?',
        codeSnippetWithBlank: `<a href="___">Ver Galeria de Fotos</a>\n\n<div id="galeria">\n  <h2>Nossas Fotos</h2>\n</div>`,
        correctAnswer: '#galeria',
        options: [
          {
            id: 'opt-hash-galeria',
            text: '#galeria',
            isCorrect: true,
            explanation:
              'Exatamente! O caractere # indica que a navegação é para um elemento na mesma página que possui o id correspondente (id="galeria").',
          },
          {
            id: 'opt-point-galeria',
            text: '.galeria',
            isCorrect: false,
            explanation:
              'O ponto (.) é seletor de classe em CSS, mas âncoras de HTML utilizam a cerquilha (#) para apontar para o id.',
          },
          {
            id: 'opt-plain-galeria',
            text: 'galeria.html',
            isCorrect: false,
            explanation:
              'Isso procuraria um novo arquivo chamado galeria.html em vez de saltar para o id da página atual.',
          },
          {
            id: 'opt-at-galeria',
            text: '@galeria',
            isCorrect: false,
            explanation:
              'O símbolo @ não é reconhecido como âncora interna em URLs HTML.',
          },
        ],
        correctOptionId: 'opt-hash-galeria',
        explanationOnCorrect:
          'Salto perfeito executado! A cerquilha #galeria encontra o elemento id="galeria" instantaneamente.',
        explanationOnIncorrect:
          'Para âncoras na mesma página, lembre-se do símbolo de hashtag/cerquilha: #id.',
        xpReward: 20,
      },
      {
        id: 'step-4-2-choice',
        type: 'multiple_choice',
        title: 'Missão: Segurança em Nova Aba',
        question: 'Ao usar target="_blank" em um link para um site externo, por que é uma boa prática essencial incluir rel="noopener noreferrer"?',
        options: [
          {
            id: 'opt-sec-protect',
            text: 'Por segurança e privacidade, impedindo que a nova página controle a aba de origem ou espione dados.',
            isCorrect: true,
            explanation:
              'Correto! rel="noopener noreferrer" corta o vínculo window.opener e protege o usuário contra ataques de redirecionamento malicioso.',
          },
          {
            id: 'opt-sec-faster',
            text: 'Para diminuir pela metade a velocidade da conexão de internet.',
            isCorrect: false,
            explanation:
              'Ele não diminui a velocidade da conexão; seu foco é estritamente segurança e proteção de contexto.',
          },
          {
            id: 'opt-sec-color',
            text: 'Apenas para mudar a cor do link para verde escuro.',
            isCorrect: false,
            explanation:
              'A cor do link é estilizada com CSS; o atributo rel é puramente relacional e de segurança.',
          },
        ],
        correctOptionId: 'opt-sec-protect',
        explanationOnCorrect:
          'Blindagem de mestre! Você programa com padrões profissionais de cibersegurança e boas práticas da W3C.',
        explanationOnIncorrect:
          'Sempre que abrir uma nova aba externa, proteja seu usuário com rel="noopener noreferrer".',
        xpReward: 20,
      },
    ],
  },
};
