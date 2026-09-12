import { LearningModule, Quest } from '@/types/learning';

/**
 * Módulo 10: Interação Nativa
 * Pertencente à: Era da Descoberta (HTML)
 */
export const MODULE_10_INTERACAO_NATIVA: LearningModule = {
  id: 'html-mod-10',
  eraId: 'era-descoberta',
  order: 10,
  title: 'Interação Nativa',
  tagline: 'Validações e componentes interativos nativos',
  description:
    'Aprenda a validar formulários com required e pattern, e crie seções retráteis e modais usando tags nativas do HTML.',
  status: 'locked',
  xpReward: 130,
  iconName: 'zap',
  estimatedMinutes: 9,
  lessons: [
    {
      id: 'quest-html-10-1',
      title: 'Validação Nativa: required e limites',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-10-2',
      title: 'Componentes Retráteis: details e summary',
      durationMinutes: 5,
      isCompleted: false,
      type: 'quest',
    },
  ],
};

export const MODULE_10_QUESTS: Record<string, Quest> = {
  'quest-html-10-1': {
    id: 'quest-html-10-1',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-10',
    moduleOrder: 10,
    moduleTitle: 'Interação Nativa',
    title: 'Validação Nativa: required e limites',
    subtitle: 'Evite envios vazios ou inválidos usando recursos nativos do navegador',
    estimatedMinutes: 4,
    totalXp: 60,
    steps: [
      {
        id: 'step-10-1-concept',
        type: 'concept',
        title: 'Validação direto no navegador',
        conceptText:
          'Não é preciso escrever linhas e linhas de JavaScript só para saber se um campo foi preenchido. O HTML moderno tem validações nativas bem práticas:\n\n• required: impede o envio se o campo estiver vazio;\n• minlength="8" / maxlength="20": define limites de tamanho para senhas ou apelidos;\n• min="18" / max="120": define valores mínimos e máximos para números ou datas;\n• pattern="[0-9]{5}-[0-9]{3}": valida formatos específicos (como CEP);\n• type="email": confere se o texto tem o formato básico de e-mail (como o "@" e o domínio).',
        codeSnippet: `<form>\n  <label for="senha">Crie uma senha (mínimo 8 dígitos):</label>\n  <input\n    type="password"\n    id="senha"\n    name="senha"\n    required\n    minlength="8"\n  >\n  <button type="submit">Cadastrar</button>\n</form>`,
        tatuTip:
          'A validação no HTML dá um feedback rápido para quem está preenchendo. Ainda assim, é fundamental validar também no servidor para garantir a segurança.',
        xpReward: 15,
      },
      {
        id: 'step-10-1-completion',
        type: 'code_completion',
        title: 'Tornando um campo obrigatório',
        question: 'Qual atributo torna o preenchimento de um campo obrigatório antes do envio?',
        codeSnippetWithBlank: `<input type="text" id="nome" name="nome" ___>`,
        correctAnswer: 'required',
        options: [
          {
            id: 'opt-comp-required',
            text: 'required',
            isCorrect: true,
            explanation:
              'Correto! O atributo required faz o navegador bloquear o envio se o campo estiver em branco.',
          },
          {
            id: 'opt-comp-mandatory',
            text: 'mandatory',
            isCorrect: false,
            explanation:
              '"mandatory" não existe no HTML; o atributo correto é "required".',
          },
          {
            id: 'opt-comp-must',
            text: 'must-fill',
            isCorrect: false,
            explanation:
              'Essa opção não faz parte dos atributos do HTML.',
          },
        ],
        correctOptionId: 'opt-comp-required',
        explanationOnCorrect:
          'Boa! O atributo required impede o envio caso o campo esteja em branco.',
        explanationOnIncorrect:
          'O termo padrão é required.',
        xpReward: 20,
      },
      {
        id: 'step-10-1-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: validação de e-mail',
        question: 'Ao usar <input type="email">, o navegador confere se a pessoa digitou um formato básico de e-mail antes de enviar o formulário.',
        isTrue: true,
        options: [
          {
            id: 'opt-tf-email-v',
            text: 'Verdadeiro',
            isCorrect: true,
            explanation:
              'Correto! O navegador exibe um aviso se faltar o "@" ou o domínio do e-mail.',
          },
          {
            id: 'opt-tf-email-f',
            text: 'Falso',
            isCorrect: false,
            explanation:
              'Na verdade é verdadeiro: validar a estrutura básica de e-mail é nativo do HTML5.',
          },
        ],
        correctOptionId: 'opt-tf-email-v',
        explanationOnCorrect:
          'Exato! O type="email" já avisa se o formato digitado estiver incompleto.',
        explanationOnIncorrect:
          'type="email" aciona a verificação sintática automática do navegador.',
        xpReward: 25,
      },
    ],
  },

  'quest-html-10-2': {
    id: 'quest-html-10-2',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-10',
    moduleOrder: 10,
    moduleTitle: 'Interação Nativa',
    title: 'Componentes Retráteis: details e summary',
    subtitle: 'Crie menus sanfona e modais usando apenas HTML',
    estimatedMinutes: 5,
    totalXp: 60,
    steps: [
      {
        id: 'step-10-2-concept',
        type: 'concept',
        title: 'Elementos interativos sem JavaScript',
        conceptText:
          'Por muito tempo, criar um menu sanfona retrátil exigia bibliotecas em JavaScript. Hoje o HTML resolve isso nativamente:\n\n• <details> e <summary>: a tag <details> esconde o conteúdo até a pessoa clicar. O <summary> é o título clicável que já vem com uma setinha nativa!\n\n• <dialog>: a tag própria para modais e janelas de diálogo, com suporte a acessibilidade (fechar com Esc) e fundo escurecido.',
        codeSnippet: `<!-- Acordeão FAQ 100% nativo -->\n<details>\n  <summary>O que é o App-dev?</summary>\n  <p>Uma plataforma interativa que ensina programação na prática!</p>\n</details>`,
        tatuTip:
          'Você pode colocar o atributo open no <details> (<details open>) para que o bloco já comece aberto na página.',
        xpReward: 15,
      },
      {
        id: 'step-10-2-fix',
        type: 'code_fix',
        title: 'Organizando o acordeão',
        question: 'O código abaixo inverteu a ordem das tags do acordeão. Qual é a estrutura correta?',
        brokenCode: `<summary>\n  <details>Como funciona a plataforma?</details>\n  <p>Resposta da pergunta...</p>\n</summary>`,
        fixedCode: `<details>\n  <summary>Como funciona a plataforma?</summary>\n  <p>Resposta da pergunta...</p>\n</details>`,
        options: [
          {
            id: 'opt-fix-10-2-a',
            text: 'O <details> deve envolver tudo, e o <summary> deve ser o primeiro elemento com o título clicável.',
            isCorrect: true,
            explanation:
              'Perfeito! <details> é o bloco retrátil e <summary> é o título clicável que abre ou fecha o conteúdo.',
          },
          {
            id: 'opt-fix-10-2-b',
            text: 'Substituir as duas tags por botões <button>.',
            isCorrect: false,
            explanation:
              'A combinação nativa para blocos retráteis é <details> e <summary>.',
          },
          {
            id: 'opt-fix-10-2-c',
            text: 'Apagar a tag <p> com a resposta.',
            isCorrect: false,
            explanation:
              'O texto dentro do <p> é justamente o conteúdo que deve aparecer ao clicar.',
          },
        ],
        correctOptionId: 'opt-fix-10-2-a',
        explanationOnCorrect:
          'Boa! O <details> envolve o conteúdo e o <summary> serve de cabeçalho clicável.',
        explanationOnIncorrect:
          'A tag externa é <details>; o rótulo clicável é <summary>.',
        xpReward: 20,
      },
      {
        id: 'step-10-2-challenge',
        type: 'practical_challenge',
        title: 'Iniciando a seção aberta',
        question: 'Qual atributo na tag <details> faz com que o conteúdo já apareça aberto na página?',
        codeSnippetWithBlank: `<details ___>\n  <summary>Termos de Uso</summary>\n  <p>Leia com atenção as cláusulas contratuais.</p>\n</details>`,
        correctAnswer: 'open',
        options: [
          {
            id: 'opt-open-attr',
            text: 'open',
            isCorrect: true,
            explanation:
              'Exato! O atributo "open" faz com que o conteúdo do <details> já comece visível.',
          },
          {
            id: 'opt-active-attr',
            text: 'active',
            isCorrect: false,
            explanation:
              '"active" é um pseudo-seletor do CSS, não um atributo nativo de <details>.',
          },
          {
            id: 'opt-expanded-attr',
            text: 'expanded',
            isCorrect: false,
            explanation:
              'O atributo oficial da especificação do HTML para este elemento é "open".',
          },
        ],
        correctOptionId: 'opt-open-attr',
        explanationOnCorrect:
          'Muito bem! Com o atributo open, a seção já aparece expandida.',
        explanationOnIncorrect:
          'Para que o conteúdo já comece visível, use o atributo: open.',
        xpReward: 25,
      },
    ],
  },
};
