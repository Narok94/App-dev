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
  tagline: 'SEO, redes sociais, acessibilidade técnica e validação W3C',
  description:
    'Prepare suas páginas para o mercado profissional: metadados Open Graph para WhatsApp/LinkedIn, SEO no Google, lang="pt-BR" e as regras de ouro da acessibilidade ARIA.',
  status: 'locked',
  xpReward: 140,
  iconName: 'award',
  estimatedMinutes: 9,
  lessons: [
    {
      id: 'quest-html-11-1',
      title: 'SEO & Redes Sociais: Open Graph',
      durationMinutes: 4,
      isCompleted: false,
      type: 'quest',
    },
    {
      id: 'quest-html-11-2',
      title: 'Acessibilidade Técnica & Código Válido',
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
    title: 'SEO & Redes Sociais: Open Graph',
    subtitle: 'Faça seus links gerarem cards elegantes e chamativos no WhatsApp e Google',
    estimatedMinutes: 4,
    totalXp: 65,
    steps: [
      {
        id: 'step-11-1-concept',
        type: 'concept',
        title: 'Como a Internet Enxerga Seu Site',
        conceptText:
          'Quando você compartilha um link no WhatsApp, Twitter ou LinkedIn, como o aplicativo sabe qual imagem de capa e qual resumo exibir?\n\nA resposta está nos metadados dentro do <head>:\n\n1. SEO do Google: <meta name="description" content="..."> fornece o resumo de 1 ou 2 frases exibido abaixo do título nos resultados de busca.\n\n2. Protocolo Open Graph (OG): padronizado para redes sociais através da propriedade property="og:nome":\n• <meta property="og:title" content="Título do Card">\n• <meta property="og:description" content="Resumo atraente...">\n• <meta property="og:image" content="https://meusite.com/capa.jpg">',
        codeSnippet: `<head>\n  <meta charset="UTF-8">\n  <title>App-dev | Aprenda a Programar</title>\n  <meta name="description" content="Plataforma interativa para dominar desenvolvimento web do zero.">\n  \n  <!-- Open Graph para Redes Sociais -->\n  <meta property="og:title" content="Aprenda HTML Moderno no App-dev">\n  <meta property="og:image" content="https://app.dev/banner-og.png">\n</head>`,
        tatuTip:
          'Sempre forneça uma URL absoluta completa (com https://) na meta tag og:image. Redes sociais como o WhatsApp não conseguem carregar imagens com caminhos relativos!',
        xpReward: 15,
      },
      {
        id: 'step-11-1-completion',
        type: 'code_completion',
        title: 'Completar Código: Resumo de Busca',
        question: 'Complete a tag responsável pela descrição do site que aparece nos resultados do Google:',
        codeSnippetWithBlank: `<meta name="___" content="Cursos práticos de desenvolvimento web.">`,
        correctAnswer: 'description',
        options: [
          {
            id: 'opt-comp-desc',
            text: 'description',
            isCorrect: true,
            explanation:
              'Correto! name="description" é o metadado canônico lido por todos os mecanismos de busca da internet.',
          },
          {
            id: 'opt-comp-summary',
            text: 'summary',
            isCorrect: false,
            explanation:
              'Para SEO geral do Google, o nome canônico do metadado é "description".',
          },
          {
            id: 'opt-comp-about',
            text: 'about',
            isCorrect: false,
            explanation:
              '"about" não é um metadado padrão de SEO no HTML.',
          },
        ],
        correctOptionId: 'opt-comp-desc',
        explanationOnCorrect:
          'SEO refinado! O Google agora tem um resumo oficial para exibir aos seus futuros visitantes.',
        explanationOnIncorrect:
          'A palavra em inglês para descrição de busca é description.',
        xpReward: 25,
      },
      {
        id: 'step-11-1-choice',
        type: 'multiple_choice',
        title: 'Missão: Onde vivem os metadados do Open Graph?',
        question: 'Em qual parte do documento HTML devem obrigatoriamente residir as tags <meta> do Open Graph e SEO?',
        options: [
          {
            id: 'opt-og-head',
            text: 'Exclusivamente dentro do elemento <head>, nos bastidores do documento.',
            isCorrect: true,
            explanation:
              'Exato! Todos os metadados e configurações de protocolo vivem no <head>.',
          },
          {
            id: 'opt-og-footer',
            text: 'Dentro do <footer> ao lado dos direitos autorais.',
            isCorrect: false,
            explanation:
              'Tags <meta> são ilegais e ignoradas no <footer>; elas pertencem ao <head>.',
          },
          {
            id: 'opt-og-outside',
            text: 'Fora do arquivo HTML, em um arquivo de texto separado.',
            isCorrect: false,
            explanation:
              'Os metadados residem no próprio arquivo HTML dentro da tag <head>.',
          },
        ],
        correctOptionId: 'opt-og-head',
        explanationOnCorrect:
          'Arquitetura sólida! O <head> é o verdadeiro centro de inteligência dos robôs da web.',
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
    title: 'Acessibilidade Técnica & Código Válido',
    subtitle: 'Descubra a primeira regra do ARIA e o impacto vital do atributo lang',
    estimatedMinutes: 5,
    totalXp: 75,
    steps: [
      {
        id: 'step-11-2-concept',
        type: 'concept',
        title: 'As Regras de Ouro do Desenvolvedor Sênior',
        conceptText:
          'A diferença entre um código amador e um profissional reside na acessibilidade e conformidade com padrões:\n\n1. O Atributo lang="pt-BR":\nNa tag <html> raiz, declare SEMPRE o idioma. Leitores de tela usam isso para escolher o sintetizador de voz e a pronúncia correta das palavras.\n\n2. A Primeira Regra do ARIA (Accessible Rich Internet Applications):\n"Se você pode usar um elemento HTML nativo com a semântica já existente, NUNCA invente uma div com ARIA".\nUm erro amador clássico é fazer: <div class="botao" onclick="...">. Isso quebra navegação por teclado (Tab) e leitores de tela. Use SEMPRE <button>!',
        codeSnippet: `<!DOCTYPE html>\n<!-- Idioma definido para sintetizadores de voz -->\n<html lang="pt-BR">\n  <head>\n    <title>Página Acessível</title>\n  </head>\n  <body>\n    <!-- Botão nativo: navegável por teclado sem gambiarras -->\n    <button type="button">Curtir Publicação</button>\n  </body>\n</html>`,
        tatuTip:
          'Qualquer usuário deve conseguir navegar e interagir com seu site usando apenas a tecla TAB e ENTER do teclado. Elementos nativos como <a> e <button> já nascem com essa capacidade de fábrica!',
        xpReward: 15,
      },
      {
        id: 'step-11-2-fix',
        type: 'code_fix',
        title: 'Correção de Bug: O Falso Botão',
        question: 'O código abaixo criou um botão falso usando uma div, quebrando a navegação por teclado para pessoas com deficiência motora. Como consertar?',
        brokenCode: `<div class="btn-enviar" onclick="enviarDados()">Enviar Mensagem</div>`,
        fixedCode: `<button type="submit">Enviar Mensagem</button>`,
        options: [
          {
            id: 'opt-fix-11-2-a',
            text: 'Substituir a div genérica pela tag semântica nativa <button>, garantindo foco de teclado e acessibilidade imediata.',
            isCorrect: true,
            explanation:
              'Exato! A tag nativa <button> já possui foco por teclado (tecla Tab), ativação por Enter/Espaço e anúncio correto em leitores de tela.',
          },
          {
            id: 'opt-fix-11-2-b',
            text: 'Trocar a div por uma tag <span> com cor azul.',
            isCorrect: false,
            explanation:
              '<span> também é um elemento inline genérico sem suporte nativo a botões.',
          },
          {
            id: 'opt-fix-11-2-c',
            text: 'Adicionar mais 10 classes CSS na div.',
            isCorrect: false,
            explanation:
              'CSS cuida apenas da aparência visual, não dá acessibilidade funcional a uma div.',
          },
        ],
        correctOptionId: 'opt-fix-11-2-a',
        explanationOnCorrect:
          'Excelente! Você aplicou a Primeira Regra do ARIA: use elementos nativos semânticos sempre!',
        explanationOnIncorrect:
          'Se é um botão, a tag certa é <button>.',
        xpReward: 30,
      },
      {
        id: 'step-11-2-tf',
        type: 'true_false',
        title: 'Verdadeiro ou Falso: Atributo lang',
        question: 'O atributo lang="pt-BR" na tag <html> informa aos sintetizadores de voz para pessoas cegas que eles devem ler o texto com a pronúncia do português brasileiro.',
        isTrue: true,
        options: [
          {
            id: 'opt-tf-lang-v',
            text: 'Verdadeiro',
            isCorrect: true,
            explanation:
              'Correto! Sem esse atributo, um leitor de tela configurado em inglês tentaria ler as palavras em português com sotaque americano incompreensível.',
          },
          {
            id: 'opt-tf-lang-f',
            text: 'Falso',
            isCorrect: false,
            explanation:
              'Incorreto. O atributo lang é de importância máxima para a inteligibilidade das tecnologias assistivas.',
          },
        ],
        correctOptionId: 'opt-tf-lang-v',
        explanationOnCorrect:
          'Conhecimento de nível profissional! Seu código agora respeita padrões internacionais de acessibilidade.',
        explanationOnIncorrect:
          'O atributo lang define o idioma e a pronúncia oficial do documento.',
        xpReward: 30,
      },
    ],
  },
};
