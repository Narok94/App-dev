import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

interface CodeGrimoireProps {
  code: string;
  fileName?: string;
  language?: string;
}

export function CodeGrimoire({
  code,
  fileName = 'index.html',
  language = 'HTML5',
}: CodeGrimoireProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Helper para colorir sintaxe básica de HTML
  const renderHighlightedCode = (rawCode: string) => {
    const lines = rawCode.split('\n');

    return lines.map((line, lineIdx) => {
      // Comentário HTML
      if (line.trim().startsWith('<!--')) {
        return (
          <div key={lineIdx} className="text-[#6D7796] italic">
            {line}
          </div>
        );
      }

      // Linha com tags HTML
      const parts = line.split(/(<[^>]+>)/g);

      return (
        <div key={lineIdx} className="leading-relaxed">
          {parts.map((part, partIdx) => {
            if (part.startsWith('<') && part.endsWith('>')) {
              return (
                <span key={partIdx} className="text-[#8B7CF6] font-semibold">
                  {part}
                </span>
              );
            }
            return (
              <span key={partIdx} className="text-[#F2F1EA]">
                {part}
              </span>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="w-full rounded-2xl border border-[#2A3147] bg-[#0D101A] overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.4)]">
      {/* Header do Terminal do Grimório */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#141824] border-b border-[#242A3E] text-xs">
        <div className="flex items-center gap-2">
          {/* Luzes de status */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 block" />
          </div>

          <span className="text-[#9096AC] text-[11px] font-mono ml-1.5 flex items-center gap-1">
            <Terminal className="w-3 h-3 text-[#8B7CF6]" />
            {fileName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-[#232840] text-[10px] font-bold font-mono text-[#C8F03D] uppercase tracking-wider">
            {language}
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded-lg hover:bg-[#282F48] text-[#9096AC] hover:text-[#F2F1EA] transition-colors cursor-pointer"
            title="Copiar código"
            aria-label="Copiar código"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[#C8F03D]" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Bloco de Código Formatado */}
      <div className="p-4 overflow-x-auto text-[13px] font-mono selection:bg-[#8B7CF6]/30 selection:text-white">
        <pre className="m-0 leading-relaxed font-normal">
          <code>{renderHighlightedCode(code)}</code>
        </pre>
      </div>
    </div>
  );
}
