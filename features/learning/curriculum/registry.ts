import { Era, LearningModule, Quest } from '@/types/learning';
import { ERAS_CATALOG } from './eras';
import { DISCOVERY_MODULES, DISCOVERY_QUESTS } from './modules/discovery';
import { HTML_MODULE_01_LESSONS } from '../data/htmlLessonsData';

/**
 * Registro de todas as Quests do ecossistema
 */
const QUESTS_REGISTRY: Record<string, Quest> = {
  ...DISCOVERY_QUESTS,
  // Mapeia IDs legados para as novas Quests da arquitetura piloto
  'les-1-1': DISCOVERY_QUESTS['quest-html-1-1'],
  'les-1-2': DISCOVERY_QUESTS['quest-html-1-2'],
  'les-1-3': DISCOVERY_QUESTS['quest-html-1-3'],
};

/**
 * Obtém o catálogo de todas as Eras cadastradas no sistema.
 */
export function getAllEras(): Era[] {
  return ERAS_CATALOG.map((era) => {
    if (era.id === 'era-descoberta') {
      return {
        ...era,
        modules: DISCOVERY_MODULES,
      };
    }
    return era;
  });
}

/**
 * Obtém uma Era específica pelo identificador.
 */
export function getEraById(eraId: string): Era | undefined {
  const eras = getAllEras();
  return eras.find((e) => e.id === eraId);
}

/**
 * Obtém a Era ativa atual (padrão: Era da Descoberta).
 */
export function getActiveEra(): Era {
  const eras = getAllEras();
  return eras.find((e) => e.status === 'current') || eras[0];
}

/**
 * Retorna todos os módulos da trilha ativa (compatível com o Dashboard atual).
 */
export function getAllModules(): LearningModule[] {
  return DISCOVERY_MODULES;
}

/**
 * Obtém módulos de uma Era específica.
 */
export function getModulesForEra(eraId: string): LearningModule[] {
  const era = getEraById(eraId);
  return era?.modules || [];
}

/**
 * Busca um módulo por ID.
 */
export function getModuleById(moduleId: string): LearningModule | undefined {
  return DISCOVERY_MODULES.find((m) => m.id === moduleId);
}

/**
 * Busca uma Quest por ID na base de dados de quests.
 */
export function getQuestById(questId: string): Quest | undefined {
  if (QUESTS_REGISTRY[questId]) {
    return QUESTS_REGISTRY[questId];
  }

  // Fallback para lições legadas caso existam
  if (HTML_MODULE_01_LESSONS[questId]) {
    const legacy = HTML_MODULE_01_LESSONS[questId];
    return {
      ...legacy,
      eraId: 'era-descoberta',
    };
  }

  return undefined;
}

/**
 * Obtém a primeira quest de um módulo.
 */
export function getFirstQuestOfModule(moduleId: string): Quest | undefined {
  const mod = getModuleById(moduleId);
  if (!mod || !mod.lessons || mod.lessons.length === 0) return undefined;

  const firstPreview = mod.lessons[0];
  return getQuestById(firstPreview.id);
}
