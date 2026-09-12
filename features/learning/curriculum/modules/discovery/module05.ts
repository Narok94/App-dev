import { LearningModule, Quest } from '@/types/learning';

/**
 * Módulo 5: O Mundo Ganha Forma
 * Pertencente à: Era da Descoberta (HTML)
 */
export const MODULE_05_MUNDO_FORMA: LearningModule = {
  id: 'html-mod-5',
  eraId: 'era-descoberta',
  order: 5,
  title: 'O Mundo Ganha Forma',
  tagline: 'Imagens, áudio e vídeo na prática',
  description:
    'Aprenda a colocar imagens com a tag <img>, usar o texto alternativo alt para acessibilidade e adicionar áudio e vídeo à sua página.',
  status: 'locked',
  xpReward: 120,
  iconName: 'image',
  estimatedMinutes: 8,
  lessons: [
    {
      id: 'quest-html-5-1',
      title: 'Imagens e o Atributo alt',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-5-2',
      title: 'Áudio e Vídeo no HTML',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
  ],
};

export const MODULE_05_QUESTS: Record<string, Quest> = {
  'quest-html-5-1': {
    id: 'quest-html-5-1',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-5',
    moduleOrder: 5,
    moduleTitle: 'O Mundo Ganha Forma',
    title: 'Imagens e o Atributo alt',
    subtitle: 'Aprenda a colocar imagens com src, alt, width e height',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-5-1-concept',
        type: 'concept',
        title: 'Como funcionam as imagens na web',
        conceptText:
          'Diferente de um documento de texto, uma imagem não fica dentro do arquivo HTML. A tag <img> aponta para um arquivo externo através do atributo src (source).\n\nEla é uma tag que fecha nela mesma e tem duas boas práticas fundamentais:\n\n1. Atributo alt (Alternative Text): descreve a imagem em palavras. Se a imagem não carregar ou se alguém usar leitor de tela, esse texto é lido. Além disso, o Google usa o alt para entender a imagem!\n2. Atributos width e height: informar a largura e a altura originais ajuda o navegador a reservar o espaço antes do carregamento, evitando que a página dê saltos visuais.',
        codeSnippet: `<img\n  src="paisagem-montanhas.jpg"\n  alt="Cordilheira com neve ao pôr do sol sob céu alaranjado"\n  width="800"\n  height="600"\n>`,
        tatuTip:
          'Se a imagem for apenas um enfeite sem significado importante, deixe o alt vazio (alt="") em vez de remover o atributo. Assim os leitores de tela não perdem tempo lendo nada ali.',
        xpReward: 15,
      },
      {
        id: 'step-5-1-fix',
        type: 'code_fix',
        title: 'Ajuste na tag de imagem',
        question: 'O código abaixo tem problemas de sintaxe e acessibilidade. Qual é a forma correta?',
        brokenCode: `<img src="foto-perfil.png"></img>`,
        fixedCode: `<img src="foto-perfil.png" alt="Foto de perfil de Maria sorrindo com óculos escuros">`,
        options: [
          {
            id: 'opt-fix-5-1-a',
            text: 'A tag <img> fecha nela mesma (sem </img>) e precisa do atributo alt com uma descrição.',
            isCorrect: true,
            explanation:
              'Perfeito! <img> não precisa de tag de fechamento e o alt é essencial para a acessibilidade.',
          },
          {
            id: 'opt-fix-5-1-b',
            text: 'Deveríamos trocar <img> por uma tag <photo>.',
            isCorrect: false,
            explanation:
              'A tag padrão para imagens no HTML é <img>.',
          },
          {
            id: 'opt-fix-5-1-c',
            text: 'O atributo src deveria ser href.',
            isCorrect: false,
            explanation:
              'Imagens carregam arquivos usando src (source), não href.',
          },
        ],
        correctOptionId: 'opt-fix-5-1-a',
        explanationOnCorrect:
          'Boa! A tag <img> fecha nela mesma e o texto alternativo alt garante a acessibilidade.',
        explanationOnIncorrect:
          'Lembre-se: <img> não usa </img> e deve ter o atributo alt descritivo.',
        xpReward: 20,
      },
      {
        id: 'step-5-1-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: Atributo alt',
        question: 'O atributo alt em imagens pode ser removido se a imagem for bem compreensível visualmente.',
        isTrue: false,
        options: [
          {
            id: 'opt-tf-alt-v',
            text: 'Verdadeiro',
            isCorrect: false,
            explanation:
              'Na verdade não! Muitas pessoas usam leitores de tela e precisam do texto alternativo para entender o conteúdo.',
          },
          {
            id: 'opt-tf-alt-f',
            text: 'Falso',
            isCorrect: true,
            explanation:
              'Correto! O alt é indispensável para acessibilidade, para conexões lentas e para mecanismos de busca.',
          },
        ],
        correctOptionId: 'opt-tf-alt-f',
        explanationOnCorrect:
          'Muito bem! O alt é essencial para quem usa leitores de tela e para quando a imagem não carrega.',
        explanationOnIncorrect:
          'O atributo alt descreve a imagem em palavras para quem não consegue vê-la.',
        xpReward: 20,
      },
    ],
  },

  'quest-html-5-2': {
    id: 'quest-html-5-2',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-5',
    moduleOrder: 5,
    moduleTitle: 'O Mundo Ganha Forma',
    title: 'Áudio e Vídeo no HTML',
    subtitle: 'Adicione som e vídeo com tags nativas do navegador',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-5-2-concept',
        type: 'concept',
        title: 'Áudio e vídeo sem complicações',
        conceptText:
          'O HTML5 trouxe elementos nativos para reproduzir mídias sem precisar de nenhum complemento externo:\n\n• <video>: toca vídeos direto no navegador. O atributo controls exibe botões de play, pause e volume.\n• <audio>: funciona de forma semelhante para músicas, podcasts e efeitos sonoros.\n• <picture>: ajuda a carregar imagens em formatos ou tamanhos diferentes de acordo com a tela do usuário.',
        codeSnippet: `<video controls width="640" poster="capa.jpg">\n  <source src="aula.mp4" type="video/mp4">\n  <source src="aula.webm" type="video/webm">\n  Seu navegador não suporta este vídeo.\n</video>`,
        tatuTip:
          'Sempre coloque um texto simples dentro de <video> e <audio>. Se o navegador do usuário for muito antigo, ele exibe essa mensagem no lugar!',
        xpReward: 15,
      },
      {
        id: 'step-5-2-completion',
        type: 'code_completion',
        title: 'Controles do áudio',
        question: 'Qual atributo adicionamos para exibir os botões de play, pause e volume no player de áudio?',
        codeSnippetWithBlank: `<audio ___ src="podcast-episodio-01.mp3">\n  Podcast indisponível no momento.\n</audio>`,
        correctAnswer: 'controls',
        options: [
          {
            id: 'opt-comp-controls',
            text: 'controls',
            isCorrect: true,
            explanation:
              'Exato! O atributo "controls" ativa a barra nativa com play, pause e volume.',
          },
          {
            id: 'opt-comp-play',
            text: 'play',
            isCorrect: false,
            explanation:
              'O atributo correto no HTML5 para exibir a barra é "controls".',
          },
          {
            id: 'opt-comp-buttons',
            text: 'buttons',
            isCorrect: false,
            explanation:
              'Não existe o atributo buttons="" na tag <audio>.',
          },
          {
            id: 'opt-comp-show',
            text: 'show',
            isCorrect: false,
            explanation:
              'O atributo oficial é "controls".',
          },
        ],
        correctOptionId: 'opt-comp-controls',
        explanationOnCorrect:
          'Muito bem! O atributo controls mostra os botões para dar play, pausar e ajustar o volume.',
        explanationOnIncorrect:
          'O nome do atributo que ativa os botões do player é controls.',
        xpReward: 20,
      },
      {
        id: 'step-5-2-choice',
        type: 'multiple_choice',
        title: 'O que acontece sem controls?',
        question: 'O que acontece na tela ao colocar a tag <video src="filme.mp4"></video> sem o atributo controls?',
        options: [
          {
            id: 'opt-video-invisible',
            text: 'O vídeo carrega, mas fica sem botões de controle para o usuário iniciar a reprodução.',
            isCorrect: true,
            explanation:
              'Correto! Sem "controls", o navegador renderiza o vídeo sem nenhum botão visível de reprodução.',
          },
          {
            id: 'opt-video-explode',
            text: 'O computador do usuário reinicia automaticamente.',
            isCorrect: false,
            explanation:
              'HTML é apenas uma linguagem de marcação segura, sem impacto no sistema.',
          },
          {
            id: 'opt-video-css',
            text: 'O navegador cria botões personalizados em 3D sozinho.',
            isCorrect: false,
            explanation:
              'Sem controls, nenhum botão nativo é exibido na tela.',
          },
        ],
        correctOptionId: 'opt-video-invisible',
        explanationOnCorrect:
          'Exato! Sem o controls, o vídeo ou áudio fica sem os botões para o usuário interagir.',
        explanationOnIncorrect:
          'Sem controls, o player não mostra os botões de play e volume.',
        xpReward: 20,
      },
    ],
  },
};
