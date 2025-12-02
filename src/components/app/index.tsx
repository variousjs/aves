import React, { useRef } from 'react'
import { App, createComponent } from '@variousjs/various'
import actions from './actions'
import store from './store'
import Loader from './loader'
import Error from './error'
import { Props as AvesProps, Ref as AvesRef } from '../aves'

const Aves = createComponent<{}, AvesProps>({ name: 'aves' })

const T = () => {
  const avesRef = useRef<AvesRef>(null)

  return (
    <>
      <div style={{ marginBottom: 20 }}>这段文本选中时候不应该弹出浮窗</div>
      <Aves
        className="aves"
        $ref={avesRef}
        popup={({ text }) => {
            return <div style={{ background: '#fff', padding: '3px 8px', fontSize: 14, border: '1px solid #e5e5e5', boxShadow: '0px 4px 8px 0px rgba(31, 35, 41, 0.1)', borderRadius: 4 }}>
              <span style={{ cursor: 'pointer' }} onClick={() => {
                navigator.clipboard.writeText(text || '')
                avesRef.current?.hidePopup()
              }}>复制</span>
            </div>
        }}
      >
        <h3>中间件</h3>
        <div className="text" style={{ height: 1000 }}>
          空格 &nbsp; &nbsp; 情况
          Floating UI 还提供了中间件的概念，就是在调用 computePosition 之后，then 之前运行的一段代码，可以改变浮动元素的定位和行为。
    中间件是实现除了基本定位功能之外的其他功能统一的方式。
    Floating UI 提供了下面几个中间件
          <p>另外一段文字情况</p>
        </div>
      </Aves>
    </>
  )
}

const entry: App<typeof store> = {
  store,
  Root: T,
  Fallback: Loader,
  ErrorFallback: Error,
  actions,
}

export default entry
