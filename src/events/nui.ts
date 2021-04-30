import { isObject, kebabCase } from 'lodash-es';

export interface NuiEvent extends Event {
  data: {
    event: string;
  };
}

type ResultValue<O, K extends keyof O, R> = O[K] extends {
  [p: string]: infer U;
}
  ? { [key in keyof O[K]]: ResultValue<O[K], key, R> }
  : R;

function mapValues<O, K extends keyof O, R extends string>(
  object: O,
  prefix: string = 'lockpick'
): { [key in K]: ResultValue<O, key, R> } {
  return Object.entries(object).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: isObject(value)
        ? mapValues(value, `${prefix}:${kebabCase(key)}`)
        : `${prefix}:${value}`,
    }),
    {} as any
  );
}

export const events = mapValues({
  challengeRing: {
    start: 'start',
    success: 'success',
    failure: 'failure',
  },
});
