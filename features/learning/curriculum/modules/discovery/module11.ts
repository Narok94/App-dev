import { LearningModule, Quest } from '@/types/learning';

/**
 * Módulo 11: HTML Profissional
 * Pertencente à: Era da Descoberta (HTML)
 */
export const MODULE_11_HTML_PROFISSIONAL: LearningModule = {
  id: 'html-mod-11',
  eraId: 'era-descoberta',
  order: 11,
  title: 'HTML Profissional',
  tagline: 'SEO, redes sociais, acessibilidade e boas práticas',
  description:
    'Aprenda a configurar metadados para redes sociais e buscas, definir o idioma da página e aplicar boas práticas de acessibilidade.',
  status: 'locked',
  xpReward: 140,
  iconName: 'award',
  estimatedMinutes: 9,
  lessons: [
    {
      id: 'quest-html-11-1',
      title: 'SEO e Redes Sociais: Open Graph',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-11-2',
      title: 'Acessibilidade e Boas Práticas',
      durationMinutes: 5,
      isCompleted: false,
      type: 'quest',
    },
  ],
};

export const MODULE_11_QUESTS: Record<string, Quest> = {
  'quest-html-11-1': {
    id: 'quest-html-11-1',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-11',
    moduleOrder: 11,
    moduleTitle: 'HTML Profissional',
    title: 'SEO e Redes Sociais: Open Graph',
    subtitle: 'Faça seus links gerarem prévias completas em redes e no Google',
    estimatedMinutes: 4,
    totalXp: 65,
    steps: [
      {
        id: 'step-11-1-concept',
        type: 'concept',
        title: 'Como seu site aparece nas buscas e redes',
        conceptText:
          'Ao compartilhar um link no WhatsApp ou LinkedIn, como o aplicativo descobre qual imagem e qual texto exibir?\n\nA resposta está nos metadados dentro do <head>:\n\n1. Resumo no Google: <meta name="description" content="..."> traz a frase exibida abaixo do título nos resultados de busca.\n\n2. Open Graph (OG): padrão usado pelas redes sociais:\n• <meta property="og:title" content="Título do Card">\n• <meta property="og:description" content="Resumo claro...">\n• <meta property="og:image" content="https://meusite.com/capa.jpg">',
        codeSnippet: `<head>\n  <meta charset="UTF-8">\n  <title>App-dev | Aprenda a Programar</title>\n  <meta name="description" content="Plataforma interativa para dominar desenvolvimento web do zero.">\n  \n  <!-- Open Graph para Redes Sociais -->\n  <meta property="og:title" content="Aprenda HTML Moderno no App-dev">\n  <meta property="og:image" content="https://app.dev/banner-og.png">\n</head>`,
        tatuTip:
          'Sempre coloque o link completo (começando com https://) na meta tag og:image. Redes sociais como o WhatsApp não encontram a imagem se o caminho for relativo!',
        xpReward: 15,
      },
      {
        id: 'step-11-1-completion',
        type: 'code_completion',
        title: 'Resumo de busca para o Google',
        question: 'Complete a tag que define o resumo do site para os resultados do Google:',
        codeSnippetWithBlank: `<meta name="___" content="Cursos práticos de desenvolvimento web.">`,
        correctAnswer: 'description',
        options: [
          {
            id: 'opt-comp-desc',
            text: 'description',
            isCorrect: true,
            explanation:
              'Correto! name="description" é a tag que fornece o resumo lido pelos mecanismos de busca.',
          },
          {
            id: 'opt-comp-summary',
            text: 'summary',
            isCorrect: false,
            explanation:
              'Para a descrição geral de busca, o nome padrão é "description".',
          },
          {
            id: 'opt-comp-about',
            text: 'about',
            isCorrect: false,
            explanation:
              '"about" não é um metadado padrão do HTML para SEO.',
          },
        ],
        correctOptionId: 'opt-comp-desc',
        explanationOnCorrect:
          'Muito bem! A meta tag description fornece o resumo exibido nos resultados de busca.',
        explanationOnIncorrect:
          'Para a descrição do site nos buscadores, usamos description.',
        xpReward: 25,
      },
      {
        id: 'step-11-1-choice',
        type: 'multiple_choice',
        title: 'Onde colocar os metadados?',
        question: 'Em qual parte do documento HTML devem ficar as tags <meta> de SEO e Open Graph?',
        options: [
          {
            id: 'opt-og-head',
            text: 'Dentro do elemento <head>, na parte de configurações do documento.',
            isCorrect: true,
            explanation:
              'Exato! Metadados e configurações do site ficam sempre dentro da tag <head>.',
          },
          {
            id: 'opt-og-footer',
            text: 'Dentro do <footer> ao lado das informações de contato.',
            isCorrect: false,
            explanation:
              'Tags <meta> pertencem ao <head> e não ao rodapé.',
          },
          {
            id: 'opt-og-outside',
            text: 'Fora do arquivo HTML, em um arquivo de texto separado.',
            isCorrect: false,
            explanation:
              'Os metadados ficam dentro do próprio arquivo HTML, no <head>.',
          },
        ],
        correctOptionId: 'opt-og-head',
        explanationOnCorrect:
          'Exato! Metadados e configurações de compartilhamento ficam sempre dentro do <head>.',
        explanationOnIncorrect:
          'Lembre-se: metadados ficam sempre dentro do <head>.',
        xpReward: 25,
      },
    ],
  },

  'quest-html-11-2': {
    id: 'quest-html-11-2',
    eraId: 'era-descoberta',
    moduleId: 'html-mod-11',
    moduleOrder: 11,
    moduleTitle: 'HTML Profissional',
    title: 'Acessibilidade e Boas Práticas',
    subtitle: 'Entenda o papel do atributo lang e por que usar tags nativas',
    estimatedMinutes: 5,
    totalXp: 75,
    steps: [
      {
        id: 'step-11-2-concept',
        type: 'concept',
        title: 'Acessibilidade desde o início',
        conceptText:
          'Escrever bom HTML é pensar em quem navega pela página, inclusive usando tecnologias assistivas:\n\n1. O Atributo lang="pt-BR":\nNa tag <html>, declare sempre o idioma do conteúdo. Leitores de tela usam essa informação para carregar o sintetizador de voz e a pronúncia certa das palavras.\n\n2. Prefira tags nativas:\nSe já existe uma tag HTML para aquilo, prefira usá-la em vez de criar uma <div> genérica. Um exemplo comum é usar <div onclick="..."> como se fosse botão. Isso quebra a navegação por teclado (Tab) e leitores de tela. Sempre que for um botão, use a tag <button>!',
        codeSnippet: `<!DOCTYPE html>\n<!-- Idioma definido para sintetizadores de voz -->\n<html lang="pt-BR">\n  <head>\n    <title>Página Acessível</title>\n  </head>\n  <body>\n    <!-- Botão nativo: navegável por teclado sem gambiarras -->\n    <button type="button">Curtir Publicação</button>\n  </body>\n</html>`,
        tatuTip:
          'Quem navega pelo teclado usa as teclas Tab e Enter para circular e interagir pela página. Elementos nativos como <a> e <button> já funcionam assim por padrão, sem esforço extra!',
        xpReward: 15,
      },
      {
        id: 'step-11-2-fix',
        type: 'code_fix',
        title: 'Evitando botões falsos',
        question: 'O código abaixo usou uma div genérica com clique, prejudicando a navegação por teclado. Como corrigir?',
        brokenCode: `<div class="btn-enviar" onclick="enviarDados()">Enviar Mensagem</div>`,
        fixedCode: `<button type="submit">Enviar Mensagem</button>`,
        options: [
          {
            id: 'opt-fix-11-2-a',
            text: 'Substituir a div pela tag nativa <button>, garantindo foco pelo teclado e acessibilidade.',
            isCorrect: true,
            explanation:
              'Exato! A tag <button> já recebe foco pelo teclado (Tab), pode ser ativada com Enter/Espaço e é anunciada corretamente por leitores de tela.',
          },
          {
            id: 'opt-fix-11-2-b',
            text: 'Trocar a div por uma tag <span> azul.',
            isCorrect: false,
            explanation:
              'A tag <span> também é genérica e não oferece os recursos de teclado de um botão.',
          },
          {
            id: 'opt-fix-11-2-c',
            text: 'Adicionar mais classes CSS na div.',
            isCorrect: false,
            explanation:
              'O CSS cuida da aparência, mas não transforma uma div em um botão navegável por teclado.',
          },
        ],
        correctOptionId: 'opt-fix-11-2-a',
        explanationOnCorrect:
          'Boa! Usar <button> garante foco pelo teclado e suporte nativo a leitores de tela.',
        explanationOnIncorrect:
          'Se a intenção é criar um botão, a tag recomendada é <button>.',
        xpReward: 30,
      },
      {
        id: 'step-11-2-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: o atributo lang',
        question: 'O atributo lang="pt-BR" na tag <html> ajuda leitores de tela a pronunciarem o texto com a entonação correta do português.',
        isTrue: true,
        options: [
          {
            id: 'opt-tf-lang-v',
            text: 'Verdadeiro',
            isCorrect: true,
            explanation:
              'Correto! Sem esse atributo, um sintetizador pode tentar ler em português usando a pronúncia de outro idioma, ficando difícil de entender.',
          },
          {
            id: 'opt-tf-lang-f',
            text: 'Falso',
            isCorrect: false,
            explanation:
              'Na verdade é verdadeiro: o atributo lang é muito importante para sintetizadores de voz e acessibilidade.',
          },
        ],
        correctOptionId: 'opt-tf-lang-v',
        explanationOnCorrect:
          'Isso mesmo! O atributo lang orienta a pronúncia dos sintetizadores de voz para o português.',
        explanationOnIncorrect:
          'O atributo lang define o idioma e a pronúncia do documento.',
        xpReward: 30,
      },
    ],
  },
};
