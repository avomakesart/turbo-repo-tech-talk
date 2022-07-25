type FunctionArguments<T extends Function> = T extends (...args: infer R) => any
  ? R
  : never;

type AssignableRef<ValueType> =
  | {
      bivarianceHack(instance: ValueType | null): void;
    }['bivarianceHack']
  | React.MutableRefObject<ValueType | null>;

type UnionStringArray<T extends Readonly<string[]>> = T[number];

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type LiteralUnion<T extends U, U extends any = string> =
  | T
  | (U & { _?: never });

type AnyFunction<T = any> = (...args: T[]) => any;

type ComponentProps<T> = T extends React.ComponentType<infer Props>
  ? Props extends object
    ? Props
    : never
  : never;

type MergeAlt<T, P> = P & Omit<T, keyof P>;

type Dict<T = any> = Record<string, T>;

type Booleanish = boolean | 'true' | 'false';
type StringOrNumber = string | number;

type EventKeys =
  | 'ArrowDown'
  | 'ArrowUp'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Enter'
  | 'Space'
  | 'Tab'
  | 'Backspace'
  | 'Control'
  | 'Meta'
  | 'Home'
  | 'End'
  | 'PageDown'
  | 'PageUp'
  | 'Delete'
  | 'Escape'
  | ' '
  | 'Shift';

type PrependParameters<
  TFunction extends (...args: any) => any,
  TParameters extends [...args: any]
> = (
  ...args: [...TParameters, ...Parameters<TFunction>]
) => ReturnType<TFunction>;

export type {
  FunctionArguments,
  AssignableRef,
  UnionStringArray,
  Omit,
  LiteralUnion,
  MergeAlt,
  AnyFunction,
  ComponentProps,
  Dict,
  Booleanish,
  StringOrNumber,
  EventKeys,
  PrependParameters,
};
