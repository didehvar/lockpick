import { isObject, kebabCase } from 'lodash-es';

export const events = mapValues({
  challengeRing: {
    start: 'start',
    success: 'success',
    failure: 'failure',
  },
  vehicle: {
    entering: 'entering',
    entered: 'entered',
    aborted: 'aborted',
    exited: 'exited',
    isOwned: 'isOwned',
    owned: 'owned',
    unowned: 'unowned',
    hotwired: 'hotwired',
  },
  lockpick: {
    start: 'start',
  },
});

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
