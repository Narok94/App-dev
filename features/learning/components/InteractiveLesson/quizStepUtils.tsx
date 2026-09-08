import React from 'react';
import { CheckCircle2, Code, AlertCircle, ListOrdered, Swords } from 'lucide-react';
import { LessonStep } from '@/types/learning';

export interface QuizStepTypeInfo {
  label: string;
  icon: React.ReactNode;
  bg: string;
  color: string;
}

export function getQuizStepTypeInfo(type: string): QuizStepTypeInfo {
  switch (type) {
    case 'true_false':
      return {
        label: 'Verdadeiro ou Falso',
        icon: <CheckCircle2 className="w-3 h-3 text-[#38BDF8]" />,
        bg: 'rgba(56,189,248,0.12)',
        color: '#38BDF8',
      };
    case 'code_completion':
      return {
        label: 'Complete o Código',
        icon: <Code className="w-3 h-3 text-[#C8F03D]" />,
        bg: 'rgba(200,240,61,0.12)',
        color: '#C8F03D',
      };
    case 'code_fix':
      return {
        label: 'Corrija o Bug',
        icon: <AlertCircle className="w-3 h-3 text-[#FF6B4A]" />,
        bg: 'rgba(255,107,74,0.12)',
        color: '#FF6B4A',
      };
    case 'ordering':
      return {
        label: 'Ordene a Estrutura',
        icon: <ListOrdered className="w-3 h-3 text-[#8B7CF6]" />,
        bg: 'rgba(139,124,246,0.12)',
        color: '#8B7CF6',
      };
    case 'practical_challenge':
      return {
        label: 'Desafio Prático',
        icon: <Code className="w-3 h-3 text-[#C8F03D]" />,
        bg: 'rgba(200,240,61,0.12)',
        color: '#C8F03D',
      };
    default:
      return {
        label: 'Missão do Passo',
        icon: <Swords className="w-3 h-3 text-[#FF6B4A]" />,
        bg: 'var(--coral-tint)',
        color: 'var(--coral)',
      };
  }
}

export function getStepCodeToDisplay(step: LessonStep): string | undefined {
  if ('codeSnippetWithBlank' in step && step.codeSnippetWithBlank) {
    return step.codeSnippetWithBlank;
  }
  if ('brokenCode' in step && step.brokenCode) {
    return step.brokenCode;
  }
  if ('starterCode' in step && typeof (step as { starterCode?: unknown }).starterCode === 'string') {
    return (step as { starterCode: string }).starterCode;
  }
  if ('codeSnippet' in step && step.codeSnippet) {
    return step.codeSnippet;
  }
  return undefined;
}
