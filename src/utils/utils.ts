import { Omit } from './TypeUtil';

type MappingFunction<E, K> = (e: E) => K;
export const reduceToMapping = <E, K extends number | string>(
  map: MappingFunction<E, K>,
) => (mapping: any, e: E) => ({ ...mapping, [map(e)]: e });

export const sortByKey = <E, K>(keyGetter: (e: E) => K, descending = false) => (
  left: E,
  right: E,
) => {
  const l = keyGetter(left),
    r = keyGetter(right);
  if (l < r) {
    return descending ? 1 : -1;
  } else if (r < l) {
    return descending ? -1 : 1;
  } else {
    return 0;
  }
};

export const omit = <T, K extends keyof T>(
  object: T,
  keys: K[],
): Omit<T, K> => {
  const result = {} as Omit<T, K>;
  Object.keys(object).forEach(key => {
    if (!keys.includes(key as K)) {
      Object.assign(result, { [key]: object[key] });
    }
  });
  return result;
};

export const pick = <T, K extends keyof T>(
  object: T,
  keys: K[],
): Pick<T, K> => {
  const o: Pick<T, K> = {} as any;
  keys.forEach(key => (o[key] = object[key]));
  return o;
};

export const range = (from: number, to: number) => {
  if (to < from) {
    console.warn(`Beginning must be before end; from ${from}, to: ${to}`);
    to = from;
  }
  return Array(to - from)
    .fill(undefined)
    .map((_, i) => from + i);
};
