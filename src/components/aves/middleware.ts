import { Middleware } from '@floating-ui/react-dom'

export const anchorCssProperties = (): Middleware => ({
  name: 'anchorCssProperties',
  async fn(data) {
    const { rects, elements, platform } = data
    const { width, height } = rects.reference
    const { width: popoverWidth, height: popoverHeight } = rects.floating
    elements.floating.style.setProperty('--selection-popover-select-width', `${width}px`)
    elements.floating.style.setProperty('--selection-popover-select-height', `${height}px`)
    const newDimensions = await platform.getDimensions(elements.floating)
    if (popoverWidth !== newDimensions.width || popoverHeight !== newDimensions.height) {
      return { reset: { rects: true } }
    }
    return {}
  },
})

export const transformOrigin = (options: { arrowWidth: number; arrowHeight: number }): Middleware => ({
  name: 'transformOrigin',
  fn(data) {
    const { rects, middlewareData } = data

    const isArrowHidden = middlewareData.arrow?.centerOffset !== 0
    const arrowWidth = isArrowHidden ? 0 : options.arrowWidth
    const arrowHeight = isArrowHidden ? 0 : options.arrowHeight
    const noArrowAlign = '50%'
    const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2
    const x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`
    const y = `${rects.floating.height + arrowHeight}px`

    return { data: { x, y } }
  },
})
