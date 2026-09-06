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
  tagline: 'Validação e componentes vivos sem precisar de JavaScript',
  description:
    'Descubra o poder do HTML moderno: valide formulários nativamente com required e pattern, e crie acordeões com details/summary e modais com dialog.',
  status: 'locked',
  xpReward: 130,
  iconName: 'zap',
  estimatedMinutes: 9,
  lessons: [
    {
      id: 'quest-html-10-1',
      title: 'Validação Nativa: required & limites',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-10-2',
      title: 'Componentes Vivos: details, summary & dialog',
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
    title: 'Validação Nativa: required & limites',
    subtitle: 'Impeça envios incorretos aproveitando a inteligência nativa do navegador',
    estimatedMinutes: 4,
    totalXp: 60,
    steps: [
      {
        id: 'step-10-1-concept',
        type: 'concept',
        title: 'O Navegador Valida por Você',
        conceptText:
          'Você não precisa escrever centenas de linhas de JavaScript para conferir se um campo foi preenchido. O HTML moderno possui validação nativa de alta performance:\n\n• required: atributo booleano que impede o envio do formulário se o campo estiver em branco;\n• minlength="8" / maxlength="20": define limites de caracteres para senhas ou apelidos;\n• min="18" / max="120": define limites numéricos ou de datas;\n• pattern="[0-9]{5}-[0-9]{3}": valida formatos com expressões regulares (ex: CEP brasileiro);\n• type="email": valida automaticamente se há um "@" e um domínio válido.',
        codeSnippet: `<form>\n  <label for="senha">Crie uma senha (mínimo 8 dígitos):</label>\n  <input\n    type="password"\n    id="senha"\n    name="senha"\n    required\n    minlength="8"\n  >\n  <button type="submit">Cadastrar</button>\n</form>`,
        tatuTip:
          'A validação no cliente (HTML) oferece uma resposta instantânea ao usuário, mas lembre-se: todo sistema profissional também deve revalidar os dados no servidor para garantir segurança contra invasores!',
        xpReward: 15,
      },
      {
        id: 'step-10-1-completion',
        type: 'code_completion',
        title: 'Completar Código: Campo Obrigatório',
        question: 'Qual atributo booleano torna o preenchimento de um campo estritamente obrigatório antes do envio?',
        codeSnippetWithBlank: `<input type="text" id="nome" name="nome" ___>`,
        correctAnswer: 'required',
        options: [
          {
            id: 'opt-comp-required',
            text: 'required',
            isCorrect: true,
            explanation:
              'Correto! O atributo "required" faz o navegador bloquear o submit se o campo estiver vazio.',
          },
          {
            id: 'opt-comp-mandatory',
            text: 'mandatory',
            isCorrect: false,
            explanation:
              '"mandatory" não existe na especificação HTML; a palavra-chave é "required".',
          },
          {
            id: 'opt-comp-must',
            text: 'must-fill',
            isCorrect: false,
            explanation:
              'Essa palavra não é reconhecida pelos navegadores.',
          },
        ],
        correctOptionId: 'opt-comp-required',
        explanationOnCorrect:
          'Validador acionado! O formulário agora exige o dado antes de qualquer avanço.',
        explanationOnIncorrect:
          'O termo padrão é required (obrigatório em inglês).',
        xpReward: 20,
      },
      {
        id: 'step-10-1-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: Validação de E-mail',
        question: 'Ao usar <input type="email">, o navegador verifica nativamente se o usuário digitou uma estrutura válida de e-mail ao tentar enviar o formulário.',
        isTrue: true,
        options: [
          {
            id: 'opt-tf-email-v',
            text: 'Verdadeiro',
            isCorrect: true,
            explanation:
              'Correto! O navegador exibe uma caixa de diálogo nativa avisando se faltar o "@" ou o domínio.',
          },
          {
            id: 'opt-tf-email-f',
            text: 'Falso',
            isCorrect: false,
            explanation:
              'Incorreto. A validação sintática de e-mail é um recurso nativo do HTML5.',
          },
        ],
        correctOptionId: 'opt-tf-email-v',
        explanationOnCorrect:
          'Precisão técnica impecável! O HTML5 cuida do trabalho pesado de validação básica.',
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
    title: 'Componentes Vivos: details, summary & dialog',
    subtitle: 'Crie sanfonas retráteis e modais sem precisar de uma única linha de JavaScript',
    estimatedMinutes: 5,
    totalXp: 60,
    steps: [
      {
        id: 'step-10-2-concept',
        type: 'concept',
        title: 'Componentes Interativos Declarativos',
        conceptText:
          'Durante anos, criar um acordeão (menu sanfona) exigia instalar bibliotecas pesadas de JavaScript. O HTML5 moderno resolveu isso nativamente:\n\n• <details> e <summary>: o contêiner <details> esconde o conteúdo até o usuário clicar. O <summary> é o título clicável que mostra uma setinha animada nativa!\n\n• <dialog>: a tag oficial para janelas modais e popups. Ela já vem com suporte a acessibilidade pelo teclado (tecla Esc fecha o modal) e backdrop de escurecimento!',
        codeSnippet: `<!-- Acordeão FAQ 100% nativo -->\n<details>\n  <summary>O que é o App-dev?</summary>\n  <p>Uma plataforma interativa que ensina programação na prática!</p>\n</details>`,
        tatuTip:
          'Você pode adicionar o atributo open no <details> (<details open>) para que o painel já comece aberto na tela por padrão!',
        xpReward: 15,
      },
      {
        id: 'step-10-2-fix',
        type: 'code_fix',
        title: 'Correção de Bug: O Acordeão Desordenado',
        question: 'O código abaixo inverteu a hierarquia da tag do acordeão. Qual é o reparo correto?',
        brokenCode: `<summary>\n  <details>Como funciona a plataforma?</details>\n  <p>Resposta da pergunta...</p>\n</summary>`,
        fixedCode: `<details>\n  <summary>Como funciona a plataforma?</summary>\n  <p>Resposta da pergunta...</p>\n</details>`,
        options: [
          {
            id: 'opt-fix-10-2-a',
            text: 'O <details> deve ser a tag pai externa, e o <summary> deve ser o primeiro filho com a pergunta.',
            isCorrect: true,
            explanation:
              'Perfeito! <details> é o contêiner retrátil e <summary> é o cabeçalho clicável de abertura.',
          },
          {
            id: 'opt-fix-10-2-b',
            text: 'Substituir ambas as tags por botões <button>.',
            isCorrect: false,
            explanation:
              'Para um acordeão semântico nativo sem JavaScript, a combinação oficial é <details> e <summary>.',
          },
          {
            id: 'opt-fix-10-2-c',
            text: 'Apagar a tag <p> com a resposta.',
            isCorrect: false,
            explanation:
              'A resposta é o conteúdo que deve ser revelado ao clicar no summary.',
          },
        ],
        correctOptionId: 'opt-fix-10-2-a',
        explanationOnCorrect:
          'Acordeão concertado com perfeição! Agora ele abre e fecha com suavidade nativa.',
        explanationOnIncorrect:
          'A casca externa é <details>; o rótulo clicável é <summary>.',
        xpReward: 20,
      },
      {
        id: 'step-10-2-challenge',
        type: 'practical_challenge',
        title: 'Desafio Prático: Estado Inicial Aberto',
        question: 'Qual atributo booleano adicionado à tag <details> faz com que a sanfona já seja renderizada aberta na tela?',
        codeSnippetWithBlank: `<details ___>\n  <summary>Termos de Uso</summary>\n  <p>Leia com atenção as cláusulas contratuais.</p>\n</details>`,
        correctAnswer: 'open',
        options: [
          {
            id: 'opt-open-attr',
            text: 'open',
            isCorrect: true,
            explanation:
              'Exatamente! O atributo "open" define que o conteúdo interno do <details> já começa visível.',
          },
          {
            id: 'opt-active-attr',
            text: 'active',
            isCorrect: false,
            explanation:
              '"active" é um pseudo-seletor em CSS, não um atributo nativo de <details>.',
          },
          {
            id: 'opt-expanded-attr',
            text: 'expanded',
            isCorrect: false,
            explanation:
              'O atributo oficial da especificação do HTML5 para esta tag é estritamente "open".',
          },
        ],
        correctOptionId: 'opt-open-attr',
        explanationOnCorrect:
          'Sanfona aberta com sucesso! open é o controle de estado declarativo do elemento details.',
        explanationOnIncorrect:
          'Para abrir por padrão, use o atributo simples: open.',
        xpReward: 25,
      },
    ],
  },
};
