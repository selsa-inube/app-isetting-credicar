import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { decisionsEqual } from "@src/utils/destination/decisionsEqual";

interface IDecisionByRule {
  decisionId: string;
  ruleName: string;
  ruleDataType: string;
  value: string;
  howToSetTheDecision: string;
  effectiveFrom: string;
}

interface IRuleGroup {
  decisionsByRule: IDecisionByRule[];
  ruleName: string;
}

interface IArrayComparisonResult {
  areEqual: boolean;
  added: IDecisionByRule[];
  removed: IDecisionByRule[];
  modified: IDecisionByRule[];
  unchanged: IDecisionByRule[];
}

/**
 * Compara dos arrays de grupos de reglas y retorna las diferencias
 * @param arr1 - Array original (prevRef)
 * @param arr2 - Array nuevo (newDecision)
 * @returns Objeto con el resultado de la comparación y las diferencias
 */
const arraysEqual = (
  arr1: IRuleGroup[],
  arr2: IRuleGroup[],
): IArrayComparisonResult => {
  const result: IArrayComparisonResult = {
    areEqual: true,
    added: [],
    removed: [],
    modified: [],
    unchanged: [],
  };

  // Si no hay grupos en ninguno de los arrays
  if (arr1.length === 0 && arr2.length === 0) {
    return result;
  }

  // Obtener todas las decisiones de cada array
  const decisions1 = arr1.flatMap((group) => group.decisionsByRule);
  const decisions2 = arr2.flatMap((group) => group.decisionsByRule);

  // Crear mapas por decisionId para búsqueda rápida
  const decisions1Map = new Map(decisions1.map((d) => [d.decisionId, d]));
  const decisions2Map = new Map(decisions2.map((d) => [d.decisionId, d]));

  // Encontrar decisiones eliminadas (están en arr1 pero no en arr2)
  for (const decision1 of decisions1) {
    const decision2 = decisions2Map.get(decision1.decisionId);

    if (!decision2) {
      result.removed.push(decision1);
      result.areEqual = false;
    } else {
      // Verificar si fue modificada
      if (
        !decisionsEqual(
          decision1 as IRuleDecisionExtended,
          decision2 as IRuleDecisionExtended,
        )
      ) {
        result.modified.push(decision2);
        result.areEqual = false;
      } else {
        result.unchanged.push(decision1);
      }
    }
  }

  // Encontrar decisiones agregadas (están en arr2 pero no en arr1)
  for (const decision2 of decisions2) {
    if (!decisions1Map.has(decision2.decisionId)) {
      result.added.push(decision2);
      result.areEqual = false;
    }
  }

  return result;
};

/**
 * Versión simplificada que solo retorna boolean (compatible con tu código anterior)
 * @param arr1 - Array original
 * @param arr2 - Array nuevo
 * @returns true si son iguales, false si hay diferencias
 */
const arraysEqualSimple = (arr1: IRuleGroup[], arr2: IRuleGroup[]): boolean => {
  const result = arraysEqual(arr1, arr2);
  return result.areEqual;
};

/**
 * Obtiene un resumen de los cambios en formato legible
 */
const getChangesSummary = (result: IArrayComparisonResult): string => {
  if (result.areEqual) {
    return "No hay cambios";
  }

  const parts: string[] = [];

  if (result.added.length > 0) {
    parts.push(`${result.added.length} agregada(s)`);
  }

  if (result.removed.length > 0) {
    parts.push(`${result.removed.length} eliminada(s)`);
  }

  if (result.modified.length > 0) {
    parts.push(`${result.modified.length} modificada(s)`);
  }

  return parts.join(", ");
};

export {
  arraysEqual,
  arraysEqualSimple,
  getChangesSummary,
  type IArrayComparisonResult,
  type IRuleGroup,
  type IDecisionByRule,
};
