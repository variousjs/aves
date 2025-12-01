import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  shift,
  limitShift,
  flip,
  hide,
  inline,
} from '@floating-ui/react-dom'
import { anchorCssProperties, transformOrigin } from './middleware'

export interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

const Aves = (props: Props) => {
  const [selectionText, setSelectionText] = useState<string>()
  const textWrapperRef = useRef<HTMLDivElement>(null)
  const bodyUserSelect = useRef(document.body.style.userSelect)

  const detectOverflowOptions = {
    padding: 10,
  }

  const { x, y, strategy, refs, isPositioned } = useFloating({
    strategy: 'fixed',
    placement: 'top',
    whileElementsMounted: autoUpdate,
    middleware: [
      inline(),
      anchorCssProperties(),
      offset({ mainAxis: 10, alignmentAxis: 0 }),
      flip(detectOverflowOptions),
      shift({
        mainAxis: true,
        crossAxis: false,
        limiter: limitShift(),
        ...detectOverflowOptions,
      }),
      transformOrigin({ arrowWidth: 10, arrowHeight: 5 }),
      hide({ strategy: 'referenceHidden' }),
    ],
  })

  const onCheckSelection = useCallback(async () => {
    setSelectionText(undefined)
    await new Promise((r) => setTimeout(r))

    const selection = document.getSelection()

    if (!selection || selection.isCollapsed || !selection.toString().length) {
      return
    }
    if (!textWrapperRef.current?.contains(selection.anchorNode)) {
      return
    }

    const range = selection.getRangeAt(0)
    setSelectionText(range.toString())
    refs.setReference(range)
  }, [refs])

  useEffect(() => {
    document.addEventListener('pointerup', onCheckSelection)
    return () => {
      document.removeEventListener('pointerup', onCheckSelection)
    }
  }, [onCheckSelection])

  return (
    <>
      <div
        style={{ userSelect: 'text', ...props.style }}
        ref={textWrapperRef}
        className={props.className}
        onPointerDown={() => {
          document.body.style.userSelect = 'none'
        }}
        onPointerUp={() => {
          document.body.style.userSelect = bodyUserSelect.current
        }}
      >
        {props.children}
      </div>
      <div
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: 0,
          left: 0,
          transform: isPositioned
            ? `translate3d(${Math.round(x ?? 0)}px, ${Math.round(y ?? 0)}px, 0)`
            : 'translate3d(0, -200%, 0)',
          minWidth: 'max-content',
          zIndex: 999,
          transition: 'opacity 0.3s ease-in-out',
          opacity: selectionText === undefined ? 0 : 1,
          visibility: selectionText === undefined ? 'hidden' : 'visible',
        }}
      >
        <div style={{ userSelect: 'none' }}>
          <div style={{ background: 'gray' }}>
            {selectionText}
          </div>
        </div>
      </div>
    </>
  )
}

export default Aves
