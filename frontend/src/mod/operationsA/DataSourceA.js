import { CButtonGroup, CContainer, CFormCheck, CFormSwitch, CHeaderDivider } from '@coreui/react'
import * as op from 'object-path'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { at, mod } from './modconf'
import { apiActs } from './reducers'

function DataSource() {
  const dispatch = useDispatch()
  const filtro = useSelector((state) => op.get(state, `${mod}.filtro`))
  const onCheck = (target) => (ev) => {
    const setstate = (dispatchi, getState) =>
      new Promise(function (resolve, reject) {
        dispatch({
          type: at.SetState,
          toSet: { filtro: { [target]: ev.target.checked } },
        })
        resolve()
      })
    dispatch(setstate).then(() => {
      dispatch((d, g) => {
        dispatch({
          type: at.LoadData,
          payload: apiActs.operationsA({ filtro: g()[mod].filtro }),
        })
      })
    })
  }

  return (
    <>
      <div className={'p-3 ms-5'}>
        <button
          onClick={(ev) => {
            ev.preventDefault()
            dispatch({
              type: at.LoadData,
              payload: apiActs.operationsA({ filtro }),
            })
          }}
        >
          Atualizar
        </button>
      </div>
    </>
  )
}

export default DataSource
