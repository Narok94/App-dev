# Arquitetura de Features (Domain-Driven / Vertical Slice)

Esta pasta encapsula módulos de domínio de negócio isolados. Ao adicionar uma nova funcionalidade, organize-a como um subdiretório autocontido:

```
features/
  └── [feature-name]/
      ├── components/     # Componentes de UI específicos desta feature
      ├── hooks/          # Hooks de estado e ciclo de vida da feature
      ├── services/       # Chamadas de API, repositórios e queries
      ├── types/          # Tipos e interfaces específicas do domínio
      └── index.ts        # Exportações públicas da feature (Barreled API)
```

### Princípios:
1. **Baixo Acoplamento**: Uma feature não deve depender diretamente dos componentes internos de outra feature. Use contratos ou componentes em `/components`.
2. **Alta Coesão**: Tudo que pertence ao domínio específico reside dentro da sua respectiva pasta.
3. **Escalabilidade**: Permite que múltiplos desenvolvedores e times trabalhem em paralelo sem conflitos.
