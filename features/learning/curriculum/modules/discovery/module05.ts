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
  tagline: 'Imagens, áudio e vídeo na era moderna',
  description:
    'Insira elementos visuais com a tag <img>, compreenda a importância crucial do texto alternativo alt, explore imagens responsivas com <picture> e áudio/vídeo nativos.',
  status: 'locked',
  xpReward: 120,
  iconName: 'image',
  estimatedMinutes: 8,
  lessons: [
    {
      id: 'quest-html-5-1',
      title: 'Imagens & O Superpoder do alt',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-5-2',
      title: 'Mídia Moderna: Áudio, Vídeo & Picture',
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
    title: 'Imagens & O Superpoder do alt',
    subtitle: 'Aprenda a inserir imagens acessíveis e estáveis com src, alt, width e height',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-5-1-concept',
        type: 'concept',
        title: 'Como Imagens Funcionam na Web',
        conceptText:
          'Diferente de um arquivo do Word, uma imagem não fica "embutida" no arquivo HTML. A tag <img> cria uma janela que aponta para um arquivo externo através do atributo src (source).\n\nEla é uma tag auto-fechável (void element) e possui duas regras de ouro fundamentais:\n\n1. Atributo alt (Alternative Text): descreve a imagem em palavras. Se a imagem falhar ao carregar ou se uma pessoa com deficiência visual usar um leitor de tela, esse texto é lido com clareza. Além disso, o Google usa o alt para entender a foto!\n2. Atributos width e height: definir as dimensões originais permite ao navegador reservar o espaço exato antes mesmo da foto baixar, evitando que o texto "pule" na tela (prevenção de CLS - Cumulative Layout Shift).',
        codeSnippet: `<img\n  src="paisagem-montanhas.jpg"\n  alt="Cordilheira nevada ao entardecer sob céu azul e laranja"\n  width="800"\n  height="600"\n>`,
        tatuTip:
          'Se uma imagem for puramente decorativa (como uma linha ou enfeite que não agrega informação), deixe o alt vazio (alt="") em vez de apagá-lo, para que os leitores de tela a ignorem em silêncio.',
        xpReward: 15,
      },
      {
        id: 'step-5-1-fix',
        type: 'code_fix',
        title: 'Correção de Bug: A Imagem Invisível aos Cegos',
        question: 'Analise o código abaixo e identifique o erro gravíssimo de boas práticas e acessibilidade:',
        brokenCode: `<img src="foto-perfil.png"></img>`,
        fixedCode: `<img src="foto-perfil.png" alt="Foto de perfil de Maria sorrindo com óculos escuros">`,
        options: [
          {
            id: 'opt-fix-5-1-a',
            text: 'A tag <img> não usa fechamento </img> e precisa obrigatoriamente do atributo alt descritivo.',
            isCorrect: true,
            explanation:
              'Perfeito! <img> é uma tag auto-fechável (sem </img>) e a presença do atributo alt é obrigatória para acessibilidade e padrões W3C.',
          },
          {
            id: 'opt-fix-5-1-b',
            text: 'Deveríamos trocar <img> por uma tag <photo>.',
            isCorrect: false,
            explanation:
              'A tag padrão para imagens na web é <img>.',
          },
          {
            id: 'opt-fix-5-1-c',
            text: 'O atributo src deveria ser href.',
            isCorrect: false,
            explanation:
              'Imagens incorporam recursos usando src (source), não href.',
          },
        ],
        correctOptionId: 'opt-fix-5-1-a',
        explanationOnCorrect:
          'Excelente olho clínico! Você eliminou a tag de fechamento inválida e garantiu acessibilidade com alt.',
        explanationOnIncorrect:
          'Lembre-se: <img> nunca tem </img> e SEMPRE deve ter o atributo alt descritivo.',
        xpReward: 20,
      },
      {
        id: 'step-5-1-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: Atributo alt',
        question: 'O atributo alt em imagens pode ser totalmente removido sempre que a imagem for muito bonita e óbvia para quem enxerga.',
        isTrue: false,
        options: [
          {
            id: 'opt-tf-alt-v',
            text: 'Verdadeiro',
            isCorrect: false,
            explanation:
              'Incorreto! Milhões de pessoas navegam com leitores de tela e a internet precisa ser universal para todos.',
          },
          {
            id: 'opt-tf-alt-f',
            text: 'Falso',
            isCorrect: true,
            explanation:
              'Correto! O alt é indispensável para acessibilidade, conexões lentas e indexação em mecanismos de busca.',
          },
        ],
        correctOptionId: 'opt-tf-alt-f',
        explanationOnCorrect:
          'Consciência e profissionalismo! Acessibilidade é um direito fundamental na web.',
        explanationOnIncorrect:
          'Nunca remova o atributo alt; ele é a voz da imagem para quem não a enxerga.',
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
    title: 'Mídia Moderna: Áudio, Vídeo & Picture',
    subtitle: 'Dê voz e movimento ao navegador com tags nativas multimídia',
    estimatedMinutes: 4,
    totalXp: 55,
    steps: [
      {
        id: 'step-5-2-concept',
        type: 'concept',
        title: 'Mídia Viva sem Plugins',
        conceptText:
          'No passado, a web dependia de plugins pesados (como o finado Flash) para tocar áudio ou vídeo. O HTML5 mudou tudo com elementos nativos:\n\n• <video>: reproduz vídeos direto no navegador. O atributo controls adiciona os botões de play, pause e volume.\n• <audio>: funciona de forma idêntica para músicas, podcasts e efeitos sonoros.\n• <picture>: permite entregar imagens diferentes dependendo do tamanho da tela ou formato moderno suportado (como WebP ou AVIF).',
        codeSnippet: `<video controls width="640" poster="capa.jpg">\n  <source src="aula.mp4" type="video/mp4">\n  <source src="aula.webm" type="video/webm">\n  Seu navegador não suporta este vídeo.\n</video>`,
        tatuTip:
          'Sempre forneça texto de fallback dentro de <video> e <audio>. Se o navegador do usuário for antigo ou não suportar o formato, ele exibirá a mensagem amigável!',
        xpReward: 15,
      },
      {
        id: 'step-5-2-completion',
        type: 'code_completion',
        title: 'Completar Código: Controles de Áudio',
        question: 'Qual atributo booleano deve ser adicionado para que o reprodutor de áudio mostre os botões de play, pause e barra de progresso ao usuário?',
        codeSnippetWithBlank: `<audio ___ src="podcast-episodio-01.mp3">\n  Podcast indisponível no momento.\n</audio>`,
        correctAnswer: 'controls',
        options: [
          {
            id: 'opt-comp-controls',
            text: 'controls',
            isCorrect: true,
            explanation:
              'Exato! O atributo "controls" ativa a interface gráfica nativa de reprodução com play/pause e volume.',
          },
          {
            id: 'opt-comp-play',
            text: 'play',
            isCorrect: false,
            explanation:
              'O atributo correto da especificação HTML5 para exibir a barra é "controls".',
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
          'Áudio ativado com perfeição! O usuário agora pode ouvir e pausar o podcast com liberdade.',
        explanationOnIncorrect:
          'A palavra em inglês para painel de controle do player é controls.',
        xpReward: 20,
      },
      {
        id: 'step-5-2-choice',
        type: 'multiple_choice',
        title: 'Missão: O que acontece sem o atributo controls?',
        question: 'O que acontece na tela se você inserir a tag <video src="filme.mp4"></video> sem incluir o atributo controls?',
        options: [
          {
            id: 'opt-video-invisible',
            text: 'O vídeo é carregado, mas fica totalmente invisível ou sem botões de play para o usuário iniciar a reprodução.',
            isCorrect: true,
            explanation:
              'Correto! Sem "controls", o navegador renderiza o quadro do vídeo mas oculta qualquer botão de interação.',
          },
          {
            id: 'opt-video-explode',
            text: 'O computador do usuário reinicia automaticamente.',
            isCorrect: false,
            explanation:
              'HTML é uma linguagem declarativa segura, isso não afeta o sistema operacional.',
          },
          {
            id: 'opt-video-css',
            text: 'O navegador cria botões personalizados em 3D sozinho.',
            isCorrect: false,
            explanation:
              'Sem controls, nenhum botão nativo é desenhado na tela.',
          },
        ],
        correctOptionId: 'opt-video-invisible',
        explanationOnCorrect:
          'Entendimento cirúrgico! "controls" é o interruptor que dá usabilidade aos seus players de mídia.',
        explanationOnIncorrect:
          'Sem controls, o reprodutor não exibe botões de play e volume para o usuário.',
        xpReward: 20,
      },
    ],
  },
};
