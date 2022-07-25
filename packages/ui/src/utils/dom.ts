import { Booleanish } from './types'

export function isElement(el: any): el is Element {
    return (
      el != null &&
      typeof el == "object" &&
      "nodeType" in el &&
      el.nodeType === Node.ELEMENT_NODE
    )
  }
  
  export function isHTMLElement(el: any): el is HTMLElement {
    if (!isElement(el)) {
      return false
    }
  
    const win = el.ownerDocument.defaultView ?? window
    return el instanceof win.HTMLElement
  }
  
  export function getOwnerWindow(node?: Element | null): typeof globalThis {
    return isElement(node)
      ? getOwnerDocument(node)?.defaultView ?? window
      : window
  }
  
  export function getOwnerDocument(node?: Element | null): Document {
    return isElement(node) ? node.ownerDocument ?? document : document
  }
  
  export function getEventWindow(event: Event): typeof globalThis {
    return (((event as UIEvent).view ?? window) as unknown) as typeof globalThis
  }
  
  export function canUseDOM(): boolean {
    return !!(
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
    )
  }
  
  export const isBrowser = canUseDOM()
  
  export const dataAttr = (condition: boolean | undefined) =>
    (condition ? "" : undefined) as Booleanish
  
  export const ariaAttr = (condition: boolean | undefined) =>
    condition ? true : undefined