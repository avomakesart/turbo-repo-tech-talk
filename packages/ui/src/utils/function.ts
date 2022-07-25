import { isFunction, isNumber } from './assertion';
import { AnyFunction, FunctionArguments } from './types';

export function runIfFn<T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

export function once<T extends AnyFunction>(fn?: T | null) {
  let result: any;

  return function func(this: any, ...args: Parameters<T>) {
    if (fn) {
      result = fn.apply(this, args);
      fn = null;
    }

    return result;
  };
}

export const noop = () => {};

export function callAllHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function func(event: FunctionArguments<T>[0]) {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
}

export function callAll<T extends AnyFunction>(...fns: (T | undefined)[]) {
  return function mergedFn(arg: FunctionArguments<T>[0]) {
    fns.forEach((fn) => {
      fn?.(arg);
    });
  };
}

export const pipe =
  <R>(...fns: Array<(a: R) => R>) =>
  (v: R) =>
    fns.reduce((a, b) => b(a), v);

const distance1D = (a: number, b: number) => Math.abs(a - b);
type Point = { x: number; y: number };

const isPoint = (point: any): point is { x: number; y: number } =>
  'x' in point && 'y' in point;

export function distance<P extends Point | number>(a: P, b: P) {
  if (isNumber(a) && isNumber(b)) {
    return distance1D(a, b);
  }
  if (isPoint(a) && isPoint(b)) {
    const xDelta = distance1D(a.x, b.x);
    const yDelta = distance1D(a.y, b.y);
    return Math.sqrt(xDelta ** 2 + yDelta ** 2);
  }
  return 0;
}
