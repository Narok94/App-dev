/**
 * Production-Safe Error Boundary Component.
 * Catches JavaScript errors anywhere in the component tree, logs them safely,
 * and displays a user-friendly recovery UI without leaking internal stack traces in production.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/utils/logger';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || 'Erro inesperado de execução.',
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error('Unhandled React Component Error', 'ErrorBoundary', {
      error: error.message,
      componentStack: errorInfo.componentStack,
    });
  }

  handleReset = (): void => {
    this.setState({ hasError: false, errorMessage: undefined });
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDev = typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV);

      return (
        <div className="min-h-[50vh] w-full flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[#F8FAFC]">Algo inesperado aconteceu</h2>
              <p className="text-sm text-[#94A3B8]">
                O aplicativo encontrou uma instabilidade temporária. Seu progresso salvo permanece seguro.
              </p>
            </div>

            {isDev && this.state.errorMessage && (
              <div className="w-full text-left p-3 rounded-lg bg-[#070B14] border border-[#1E293B] font-mono text-xs text-[#F87171] overflow-x-auto">
                <p className="font-bold text-[#94A3B8] mb-1">[Dev Error Stack]:</p>
                {this.state.errorMessage}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C8F03D] hover:bg-[#B5DC30] text-[#12151F] font-bold text-sm transition-colors shadow-md active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Recarregar Aplicação
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
