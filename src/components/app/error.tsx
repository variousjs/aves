import React from 'react'
import { ErrorFallbackNode } from '@variousjs/various'
import { Store } from '../../types'

const errorComponent: ErrorFallbackNode<Store> = ({ $reload, $error }) => (
  <>
    <h3>{`[${$error.type}]: ${$error.message || '组件错误'}`}</h3>
    <button onClick={$reload}>刷新</button>
  </>
)

export default errorComponent
