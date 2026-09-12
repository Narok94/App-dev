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
  tagline: 'Criando campos, botões e formulários',
  description:
    'Aprenda a criar formulários acessíveis usando form, label, input, textarea, select e botões de envio.',
  status: 'locked',
  xpReward: 130,
  iconName: 'check-square',
  estimatedMinutes: 9,
  lessons: [
    {
      id: 'quest-html-9-1',
      title: 'A Dupla Essencial: label e input',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-9-2',
      title: 'Opções de Seleção: Radios, Selects e Botões',
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
    title: 'A Dupla Essencial: label e input',
    subtitle: 'Conecte rótulos aos campos para facilitar o preenchimento e a acessibilidade',
    estimatedMinutes: 4,
    totalXp: 60,
    steps: [
      {
        id: 'step-9-1-concept',
        type: 'concept',
        title: 'Como funcionam os formulários',
        conceptText:
          'Um formulário HTML é o canal que envia dados digitados pelo usuário:\n\n• <form action="/cadastrar" method="POST">: define para onde os dados vão e como (POST para salvar dados sigilosos; GET para buscas visíveis na URL).\n\nA boa prática fundamental é ligar cada <label> ao seu <input>:\nFaça isso combinando os atributos for e id:\n<label for="campo-nome">Seu Nome:</label>\n<input type="text" id="campo-nome" name="nome">\n\nQuando conectados, se a pessoa clicar no texto do rótulo, o cursor já entra automaticamente no campo correspondente!',
        codeSnippet: `<form action="/login" method="POST">\n  <div>\n    <label for="usuario-email">E-mail:</label>\n    <input type="email" id="usuario-email" name="email" required>\n  </div>\n  <button type="submit">Entrar</button>\n</form>`,
        tatuTip:
          'Evite usar apenas o placeholder no lugar do <label>. O placeholder some assim que a pessoa começa a digitar, o que pode fazer com que ela esqueça o que precisava preencher ali!',
        xpReward: 15,
      },
      {
        id: 'step-9-1-fix',
        type: 'code_fix',
        title: 'Conectando o rótulo ao campo',
        question: 'O campo de e-mail abaixo não está conectado ao seu rótulo. Como fazer o vínculo correto?',
        brokenCode: `<label>E-mail:</label>\n<input type="email" id="email-contato" name="email">`,
        fixedCode: `<label for="email-contato">E-mail:</label>\n<input type="email" id="email-contato" name="email">`,
        options: [
          {
            id: 'opt-fix-9-1-a',
            text: 'Adicionar for="email-contato" na tag <label>, com o mesmo valor do id do <input>.',
            isCorrect: true,
            explanation:
              'Perfeito! O atributo for no label apontando para o id no input faz a ligação correta de acessibilidade.',
          },
          {
            id: 'opt-fix-9-1-b',
            text: 'Remover a tag <label> e usar uma <div> comum no lugar.',
            isCorrect: false,
            explanation:
              'Tirar o label prejudica a acessibilidade em leitores de tela e dificulta o uso no celular.',
          },
          {
            id: 'opt-fix-9-1-c',
            text: 'Mudar type="email" para type="password".',
            isCorrect: false,
            explanation:
              'O tipo de dado do e-mail continua sendo email.',
          },
        ],
        correctOptionId: 'opt-fix-9-1-a',
        explanationOnCorrect:
          'Muito bem! Ao clicar no rótulo, o cursor pula direto para o campo.',
        explanationOnIncorrect:
          'A ligação é feita usando o atributo for="id_do_campo" no label.',
        xpReward: 20,
      },
      {
        id: 'step-9-1-completion',
        type: 'code_completion',
        title: 'Campo de senha',
        question: 'Qual valor no atributo type oculta os caracteres digitados por privacidade?',
        codeSnippetWithBlank: `<label for="pass">Senha:</label>\n<input type="___" id="pass" name="senha">`,
        correctAnswer: 'password',
        options: [
          {
            id: 'opt-comp-pass',
            text: 'password',
            isCorrect: true,
            explanation:
              'Correto! type="password" esconde o que foi digitado com bolinhas ou asteriscos.',
          },
          {
            id: 'opt-comp-secret',
            text: 'secret',
            isCorrect: false,
            explanation:
              'O valor "secret" não existe no HTML; o padrão é "password".',
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
          'Isso aí! Com type="password", os caracteres ficam ocultos na tela.',
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
    title: 'Opções de Seleção: Radios, Selects e Botões',
    subtitle: 'Aprenda a criar botões de escolha única, caixas de texto e menus suspensos',
    estimatedMinutes: 5,
    totalXp: 60,
    steps: [
      {
        id: 'step-9-2-concept',
        type: 'concept',
        title: 'Diferentes tipos de campos',
        conceptText:
          'O HTML traz elementos próprios para várias decisões:\n\n• Botões de Rádio (type="radio"): escolha única entre opções. Para que o navegador entenda que fazem parte do mesmo grupo (marcar um desmarca o outro), TODOS precisam do mesmo atributo name!\n• Checkbox (type="checkbox"): caixas de seleção onde você pode marcar várias opções ou confirmar um termo.\n• <textarea>: área para digitação de textos maiores com várias linhas (comentários, mensagens).\n• <select> com <option>: menu suspenso de escolha.\n• <button type="submit">: o botão de envio dos dados.',
        codeSnippet: `<!-- Radios com o MESMO name para seleção única -->\n<input type="radio" id="pix" name="pagamento" value="pix">\n<label for="pix">Pix</label>\n\n<input type="radio" id="cartao" name="pagamento" value="cartao">\n<label for="cartao">Cartão de Crédito</label>`,
        tatuTip:
          'Sempre declare type="submit" no botão de envio. Se usar type="button", ele não vai enviar o formulário sozinho a menos que haja JavaScript.',
        xpReward: 15,
      },
      {
        id: 'step-9-2-challenge',
        type: 'practical_challenge',
        title: 'Agrupando botões de rádio',
        question: 'Qual atributo compartilhado com o mesmo valor faz com que a escolha de um botão de rádio desmarque o outro?',
        codeSnippetWithBlank: `<input type="radio" id="tam-p" ___="tamanho" value="P">\n<label for="tam-p">Pequeno</label>\n\n<input type="radio" id="tam-g" ___="tamanho" value="G">\n<label for="tam-g">Grande</label>`,
        correctAnswer: 'name',
        options: [
          {
            id: 'opt-name-radio',
            text: 'name',
            isCorrect: true,
            explanation:
              'Exato! O mesmo atributo name é o que agrupa os botões de rádio para que funcionem em conjunto.',
          },
          {
            id: 'opt-id-radio',
            text: 'id',
            isCorrect: false,
            explanation:
              'O id precisa ser único para cada elemento na página; dois campos não devem ter o mesmo id.',
          },
          {
            id: 'opt-class-radio',
            text: 'class',
            isCorrect: false,
            explanation:
              'A classe (class) serve para estilização visual e não controla o agrupamento do rádio.',
          },
        ],
        correctOptionId: 'opt-name-radio',
        explanationOnCorrect:
          'Boa! O mesmo atributo name faz com que apenas uma opção do grupo fique marcada.',
        explanationOnIncorrect:
          'Para agrupar botões de rádio, usamos o mesmo atributo name em todos.',
        xpReward: 20,
      },
      {
        id: 'step-9-2-choice',
        type: 'multiple_choice',
        title: 'Campo para mensagens longas',
        question: 'Qual é o elemento HTML adequado para permitir que a pessoa digite mensagens ou textos de várias linhas?',
        options: [
          {
            id: 'opt-textarea',
            text: '<textarea></textarea>',
            isCorrect: true,
            explanation:
              'Correto! <textarea> permite quebras de linha e aceita textos longos.',
          },
          {
            id: 'opt-input-multiline',
            text: '<input type="multiline">',
            isCorrect: false,
            explanation:
              'Esse tipo não existe no HTML. A tag <input> aceita apenas uma única linha.',
          },
          {
            id: 'opt-paragraph-input',
            text: '<p content="editable"></p>',
            isCorrect: false,
            explanation:
              'Para campos de texto longo em formulários, a tag padrão é <textarea>.',
          },
        ],
        correctOptionId: 'opt-textarea',
        explanationOnCorrect:
          'Muito bem! Para mensagens e comentários de várias linhas, usamos <textarea>.',
        explanationOnIncorrect:
          'Para textos de várias linhas em formulários, o elemento correto é <textarea>.',
        xpReward: 25,
      },
    ],
  },
};
