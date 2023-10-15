import { get as opg } from 'object-path'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { render } from 'react-dom'
//
import DataGrid, { columnMaker } from '../../DataGrid'
import fields from './fieldsA'
import { mod } from './modconf'

const columns = columnMaker(fields)

function GridA() {
  const rowData = useSelector((state) => opg(state, `${mod}.produtosBFull`))

  return (
    <>
      <DataGrid
        gridId={`${mod}_main`}
        columns={columns}
        rowData={rowData}
        detailCellRenderer={false}
        frameworkComponents={{}}
      />
    </>
  )
}

export default GridA
