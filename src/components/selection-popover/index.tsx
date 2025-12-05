import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
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
import { Props, Ref } from '@variousjs/aves/selection-popover'

const Aves = forwardRef<Ref, Props>((props, ref) => {
  const Popup = props.popup
  const [selectionText, setSelectionText] = useState<string>()
  const textWrapperRef = useRef<HTMLDivElement>(null)
  const bodyUserSelect = useRef(document.body.style.userSelect)
  const textRef = useRef<string>(undefined)

  const { x, y, strategy, refs, isPositioned } = useFloating({
    strategy: 'fixed',
    placement: 'top',
    whileElementsMounted: autoUpdate,
    middleware: [
      inline(),
      offset({ mainAxis: 10, alignmentAxis: 0 }),
      flip(),
      shift({
        mainAxis: true,
        crossAxis: false,
        limiter: limitShift(),
      }),
      hide({ strategy: 'referenceHidden' }),
    ],
  })

  const onSelection = useCallback(async () => {
    if (props.disabled) {
      return
    }

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

    textRef.current = range.toString()
    setSelectionText(range.toString())
    refs.setReference(range)
  }, [refs])

  useEffect(() => {
    document.addEventListener('pointerup', onSelection)
    return () => {
      document.removeEventListener('pointerup', onSelection)
    }
  }, [onSelection])

  useImperativeHandle(ref, () => ({
    hidePopup: () => {
      window.getSelection()?.empty?.()
      window.getSelection()?.removeAllRanges?.()
    },
  }))

  return (
    <>
      <div
        style={{ userSelect: 'text', ...props.style }}
        ref={textWrapperRef}
        className={props.className}
        onPointerDown={() => {
          if (props.disabled) {
            return
          }
          document.body.style.userSelect = 'none'
        }}
        onPointerUp={() => {
          if (props.disabled) {
            return
          }
          document.body.style.userSelect = bodyUserSelect.current
        }}
      >
        {props.children}
      </div>
      <div
        ref={refs.setFloating}
        className={props.popupClassName}
        style={{
          position: strategy,
          top: 0,
          left: 0,
          transform: isPositioned
            ? `translate3d(${Math.round(x ?? 0)}px, ${Math.round(y ?? 0)}px, 0)`
            : 'translate3d(0, -200%, 0)',
          userSelect: 'none',
          minWidth: 'max-content',
          zIndex: 9999,
          transition: 'opacity 0.3s ease-in-out',
          opacity: selectionText === undefined ? 0 : 1,
          visibility: selectionText === undefined ? 'hidden' : 'visible',
          ...props.popupStyle,
        }}
      >
        <Popup text={textRef.current} />
      </div>
    </>
  )
})

export default Aves
