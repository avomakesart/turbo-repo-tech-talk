import { ElementType } from 'react';
import { EventKeys, MergeAlt } from './types';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type WithoutStyleAttr<T> = Omit<T, "color" | "width" | "height">

export type HTMLProps<T = any> = WithoutStyleAttr<React.HTMLAttributes<T>> &
  React.RefAttributes<T>

export type PropGetter<T extends HTMLElement = any, P = {}> = (
  props?: MergeAlt<HTMLProps<T>, P>,
  ref?: React.Ref<any> | React.RefObject<any>,
) => MergeAlt<HTMLProps<T>, P>

export type PropGetterV2<T extends ElementType, P = {}> = (
  props?: WithoutStyleAttr<React.ComponentPropsWithoutRef<T>> & P,
  ref?: React.Ref<any> | React.RefObject<any>,
) => WithoutStyleAttr<React.ComponentPropsWithRef<T>>

export type EventKeyMap = Partial<Record<EventKeys, React.KeyboardEventHandler>>
