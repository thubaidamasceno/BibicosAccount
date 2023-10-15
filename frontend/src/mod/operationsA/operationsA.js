import React, { lazy, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { mobileCheck } from '../../util'
import {  at} from './modconf'

const GridAramesA = lazy(() => import('./GridA'))

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    let p = {
      type: at.getDataSource,
    }
    dispatch(p)
  }, [dispatch])

  if (true || mobileCheck()) {
    return (
      <Suspense fallback={<div>Carregando...</div>}>
        <GridAramesA />
      </Suspense>
    )
  }
}

export default App
