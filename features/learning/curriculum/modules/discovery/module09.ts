import { LearningModule, Quest } from '@/types/learning';

/**
 * Módulo 9: Formulários
 * Pertencente à: Era da Descoberta (HTML)
 */
export const MODULE_09_FORMULARIOS: LearningModule = {
  id: 'html-mod-9',
  eraId: 'era-descoberta',
  order: 9,
  title: 'Formulários',
  tagline: 'O diálogo ativo entre o usuário e o sistema',
  description:
    'Aprenda a coletar dados com segurança e usabilidade através de form, label, input (text, email, password, radio, checkbox), textarea, select e buttons.',
  status: 'locked',
  xpReward: 130,
  iconName: 'check-square',
  estimatedMinutes: 9,
  lessons: [
    {
      id: 'quest-html-9-1',
      title: 'A Dupla Inseparável: label & input',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-9-2',
      title: 'Tipos de Entrada: Radios, Selects & Buttons',
      durationMinutes: 5,
      isCompleted: false,
      type: 'quest',
    },
  ],
};

export const MODULE_09_QUESTS: Record<string, Quest> = {
  'quest-html-9-1': {
    id: 'quest-html-9-1',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-9',
    moduleOrder: 9,
    moduleTitle: 'Formulários',
    title: 'A Dupla Inseparável: label & input',
    subtitle: 'Conecte rótulos a campos de entrada para garantir usabilidade e acessibilidade',
    estimatedMinutes: 4,
    totalXp: 60,
    steps: [
      {
        id: 'step-9-1-concept',
        type: 'concept',
        title: 'Como Formulários Conversam',
        conceptText:
          'Um formulário HTML é o canal que envia dados do usuário para o servidor:\n\n• <form action="/cadastrar" method="POST">: define para onde os dados vão e como (POST para salvar dados sigilosos; GET para buscas públicas na URL).\n\nA regra de ouro da acessibilidade é a dupla <label> e <input>:\nSempre conecte o rótulo ao campo através do par for e id:\n<label for="campo-nome">Seu Nome Completo:</label>\n<input type="text" id="campo-nome" name="nome">\n\nQuando conectados, se o usuário clicar no texto do rótulo, o cursor pula magicamente para dentro do campo!',
        codeSnippet: `<form action="/login" method="POST">\n  <div>\n    <label for="usuario-email">E-mail:</label>\n    <input type="email" id="usuario-email" name="email" required>\n  </div>\n  <button type="submit">Entrar</button>\n</form>`,
        tatuTip:
          'Nunca use o placeholder como substituto de uma tag <label>. O placeholder desaparece assim que o usuário começa a digitar, fazendo a pessoa esquecer o que aquele campo pedia!',
        xpReward: 15,
      },
      {
        id: 'step-9-1-fix',
        type: 'code_fix',
        title: 'Correção de Bug: O Campo Órfão',
        question: 'O campo de e-mail abaixo está órfão porque o label não está conectado a ele. Corrija o atributo que faz o vínculo:',
        brokenCode: `<label>E-mail:</label>\n<input type="email" id="email-contato" name="email">`,
        fixedCode: `<label for="email-contato">E-mail:</label>\n<input type="email" id="email-contato" name="email">`,
        options: [
          {
            id: 'opt-fix-9-1-a',
            text: 'Adicionar o atributo for="email-contato" na tag <label> para igualar ao id do <input>.',
            isCorrect: true,
            explanation:
              'Perfeito! O atributo for no label com o mesmo valor do id no input cria o vínculo oficial de acessibilidade.',
          },
          {
            id: 'opt-fix-9-1-b',
            text: 'Remover a tag <label> e usar apenas uma <div> comum.',
            isCorrect: false,
            explanation:
              'Remover o label torna o campo inacessível para leitores de tela e reprovado em testes de acessibilidade.',
          },
          {
            id: 'opt-fix-9-1-c',
            text: 'Mudar o type="email" para type="password".',
            isCorrect: false,
            explanation:
              'O tipo de dado do e-mail deve continuar sendo email.',
          },
        ],
        correctOptionId: 'opt-fix-9-1-a',
        explanationOnCorrect:
          'Conexão restabelecida! Ao tocar no texto da etiqueta, o campo recebe foco instantâneo.',
        explanationOnIncorrect:
          'A ponte é construída pelo atributo: for="id_do_campo".',
        xpReward: 20,
      },
      {
        id: 'step-9-1-completion',
        type: 'code_completion',
        title: 'Completar Código: Campo de Senha',
        question: 'Qual valor do atributo type oculta os caracteres digitados com pontinhos ou asteriscos para segurança?',
        codeSnippetWithBlank: `<label for="pass">Senha:</label>\n<input type="___" id="pass" name="senha">`,
        correctAnswer: 'password',
        options: [
          {
            id: 'opt-comp-pass',
            text: 'password',
            isCorrect: true,
            explanation:
              'Correto! type="password" oculta os caracteres visualmente para proteger a privacidade do usuário.',
          },
          {
            id: 'opt-comp-secret',
            text: 'secret',
            isCorrect: false,
            explanation:
              'O valor "secret" não existe; o padrão oficial é "password".',
          },
          {
            id: 'opt-comp-hidden',
            text: 'hidden',
            isCorrect: false,
            explanation:
              'type="hidden" esconde o campo inteiro da tela, não permitindo digitação.',
          },
        ],
        correctOptionId: 'opt-comp-pass',
        explanationOnCorrect:
          'Blindagem visual ativa! Senhas protegidas contra olhares curiosos com type="password".',
        explanationOnIncorrect:
          'O tipo padrão de senha em HTML é password.',
        xpReward: 25,
      },
    ],
  },

  'quest-html-9-2': {
    id: 'quest-html-9-2',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-9',
    moduleOrder: 9,
    moduleTitle: 'Formulários',
    title: 'Tipos de Entrada: Radios, Selects & Buttons',
    subtitle: 'Aprenda a agrupar botões de rádio, criar caixas de texto longas e menus suspensos',
    estimatedMinutes: 5,
    totalXp: 60,
    steps: [
      {
        id: 'step-9-2-concept',
        type: 'concept',
        title: 'Múltiplas Formas de Coleta',
        conceptText:
          'O HTML oferece componentes nativos para cada tipo de decisão do usuário:\n\n• Radio Buttons (type="radio"): escolha única entre várias opções. Para que o navegador saiba que eles pertencem ao mesmo grupo e desmarque um quando o outro for clicado, TODOS devem ter o mesmo atributo name!\n• Checkbox (type="checkbox"): caixa de seleção que permite marcar múltiplas opções independentes ou aceitar termos.\n• <textarea>: área para digitação de textos longos de múltiplas linhas (comentários, mensagens).\n• <select> com <option>: menu suspenso de seleção.\n• <button type="submit">: o gatilho que despacha os dados.',
        codeSnippet: `<!-- Radios com o MESMO name para seleção única -->\n<input type="radio" id="pix" name="pagamento" value="pix">\n<label for="pix">Pix</label>\n\n<input type="radio" id="cartao" name="pagamento" value="cartao">\n<label for="cartao">Cartão de Crédito</label>`,
        tatuTip:
          'Sempre declare explicitamente o atributo type="submit" no seu botão principal de formulário. Se você colocar type="button", ele não enviará os dados sem um script em JavaScript.',
        xpReward: 15,
      },
      {
        id: 'step-9-2-challenge',
        type: 'practical_challenge',
        title: 'Desafio Prático: Grupo de Botões de Rádio',
        question: 'Qual atributo compartilhado com o mesmo valor faz com que dois botões de rádio funcionem de forma mutuamente exclusiva (escolher um desmarca o outro)?',
        codeSnippetWithBlank: `<input type="radio" id="tam-p" ___="tamanho" value="P">\n<label for="tam-p">Pequeno</label>\n\n<input type="radio" id="tam-g" ___="tamanho" value="G">\n<label for="tam-g">Grande</label>`,
        correctAnswer: 'name',
        options: [
          {
            id: 'opt-name-radio',
            text: 'name',
            isCorrect: true,
            explanation:
              'Exato! É o atributo name idêntico que agrupa os radio buttons na especificação do navegador.',
          },
          {
            id: 'opt-id-radio',
            text: 'id',
            isCorrect: false,
            explanation:
              'O id deve ser estritamente único para cada elemento na página; dois elementos nunca podem ter o mesmo id!',
          },
          {
            id: 'opt-class-radio',
            text: 'class',
            isCorrect: false,
            explanation:
              'A classe (class) é usada apenas para CSS e não afeta o comportamento funcional de grupo do rádio.',
          },
        ],
        correctOptionId: 'opt-name-radio',
        explanationOnCorrect:
          'Grupo configurado com maestria! O atributo name idêntico garante a alternância mútua das opções.',
        explanationOnIncorrect:
          'Para agrupar botões de rádio, utilize o mesmo atributo name em todos eles.',
        xpReward: 20,
      },
      {
        id: 'step-9-2-choice',
        type: 'multiple_choice',
        title: 'Missão: Campo de Texto Longo',
        question: 'Qual é o elemento HTML correto para permitir que o usuário digite uma mensagem de suporte ou redação de várias linhas?',
        options: [
          {
            id: 'opt-textarea',
            text: '<textarea></textarea>',
            isCorrect: true,
            explanation:
              'Correto! <textarea> aceita quebras de linha e textos longos com redimensionamento nativo.',
          },
          {
            id: 'opt-input-multiline',
            text: '<input type="multiline">',
            isCorrect: false,
            explanation:
              'Esse tipo não existe; a tag <input> aceita apenas uma linha única de texto.',
          },
          {
            id: 'opt-paragraph-input',
            text: '<p content="editable"></p>',
            isCorrect: false,
            explanation:
              'O elemento nativo oficial para formulários com texto longo é a tag <textarea>.',
          },
        ],
        correctOptionId: 'opt-textarea',
        explanationOnCorrect:
          'Componente perfeito selecionado! <textarea> dá espaço para mensagens completas.',
        explanationOnIncorrect:
          'Para textos de múltiplas linhas, o elemento correto é <textarea>.',
        xpReward: 25,
      },
    ],
  },
};
