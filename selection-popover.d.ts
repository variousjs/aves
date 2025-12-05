declare module '@variousjs/aves/selection-popover' {
  import { ComponentType, CSSProperties, ReactNode } from 'react'

  export interface Props {
    children: ReactNode,
    className?: string,
    style?: CSSProperties,
    popupClassName?: string,
    popupStyle?: CSSProperties,
    popup: ComponentType<{ text?: string }>,
    disabled?: boolean,
  }

  export interface Ref {
    hidePopup: () => void,
  }
}
