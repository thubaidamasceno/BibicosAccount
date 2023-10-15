import {
  CButton,
  CContainer,
  CFormInput,
  CInputGroup,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import 'ag-grid-enterprise'
import 'ag-grid-enterprise/dist/styles/ag-grid.css'
// import 'ag-grid-enterprise/dist/styles/ag-theme-balham.css'
import 'ag-grid-enterprise/dist/styles/ag-theme-balham.css'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import moment from 'moment'
import { get as opg } from 'object-path'
import { merge as opm } from 'object-path-immutable'
import React, { useCallback, useRef, useState } from 'react'
import locale from './ag-grid-locale.ptbr'
import {
  columnTypes,
  dateComparator,
  dateFilterParams,
  defaultColDef,
  excelStyles,
  intFormatter,
  numberFormatter,
  sameAggFunc,
  statusBar,
} from './util'
import { confStore, updateRemoteConfs } from './agent'
import './print_grid.css'

export const datTimeComparator = (date1, date2) => {
  var date1Number = monthTimeToComparableNumber(date1)
  var date2Number = monthTimeToComparableNumber(date2)

  if (date1Number === null && date2Number === null) {
    return 0
  }
  if (date1Number === null) {
    return -1
  }
  if (date2Number === null) {
    return 1
  }

  return date1Number - date2Number
}

// eg 29/08/2004 gets converted to 20040829
export const monthTimeToComparableNumber = (date) => {
  if (date === undefined || date === null || date.length < 14) {
    return null
  }

  var yearNumber = parseInt(date.substring(6, 8))
  var monthNumber = parseInt(date.substring(3, 5))
  var dayNumber = parseInt(date.substring(0, 2))
  var hourNumber = parseInt(date.substring(9, 11))
  var minuteNumber = parseInt(date.substring(12, 14))

  var result =
    (yearNumber * 10000 + monthNumber * 100 + dayNumber) * 1000 + (hourNumber * 60 + minuteNumber)
  return result
}

export function columnMaker(f) {
  let r = []
  for (let k in f) {
    if (f[k].g) {
      let tp = f[k].type,
        cellRenderer = f[k].cellRenderer || opg(f[k], 'merge.cellRenderer')

      let props = {
        ...(f[k].merge || {}),
        field: k,
        // comparator: comparator,
        sortable: true,
        headerName: f[k].pt,
        key: k,
        // filter: filter,
        // filterParams: filterParams,
        // valueGetter: vgetter,
        type: tp,
        // valueFormatter: vf,
        // cellClass: cellClass,
        cellRenderer,
      }
      //-----------------------------------------------------------
      if (f[k].n) {
        props.vf = numberFormatter
        props.tp = 'rightAligned'
        props.filter = 'agNumberColumnFilter'
        props.aggFunc = 'sum'
      }

      //-----------------------------------------------------------
      if (f[k].d) {
        props.vf = (params) => {
          if (params && params.value) {
            let dt = moment(params.value)
            return dt.isValid() ? dt.format('DD/MM/YYYY') : ''
          }
          return ''
        }
        props.filter = 'agDateColumnFilter'
        props.filterParams = { dateFilterParams }
        props.vgetter = (params) => {
          if (params && params.data && opg(params, `data.${k}`)) {
            // console.log(opg(params,`data.${k}`))
            let dt = moment(opg(params, `data.${k}`))
            return dt.isValid() ? dt.format('DD/MM/YYYY') : ''
          }
          return ''
        }
        props.tp = 'dateColumn'
        props.cellClass = 'dateISO'
        props.comparator = dateComparator
      }
      //-----------------------------------------------------------
      if (f[k].dtime) {
        props.vf = (params) => {
          if (params && params.value) {
            let dt = moment(params.value, 'DD/MM/YY HH:mm')
            return dt.isValid() ? dt.format('DD/MM/YY HH:mm') : ''
          }
          return ''
        }
        props.filter = 'agDateColumnFilter'
        props.filterParams = { dateFilterParams }
        props.vgetter = (params) => {
          if (params && params.data && opg(params, `data.${k}`)) {
            // console.log(opg(params,`data.${k}`))
            let dt = moment(opg(params, `data.${k}`))
            return dt.isValid() ? dt.format('DD/MM/YY HH:mm') : ''
          }
          return ''
        }
        props.tp = 'dateColumn'
        props.cellClass = 'dateISO'
        props.comparator = datTimeComparator
      }
      //-----------------------------------------------------------
      if (f[k].dlocal) {
        props.vf = (params) => {
          if (params && params.value) {
            let dt = moment(params.value, 'DD/MM/YYYY')
            return dt.isValid() ? dt.format('DD/MM/YYYY') : ''
          }
          return ''
        }
        props.filter = 'agDateColumnFilter'
        props.filterParams = { dateFilterParams }
        props.vgetter = (params) => {
          if (params && params.data && opg(params, `data.${k}`)) {
            // console.log(opg(params,`data.${k}`))
            let dt = moment(opg(params, `data.${k}`))
            return dt.isValid() ? dt.format('DD/MM/YYYY') : ''
          }
          return ''
        }
        props.tp = 'dateColumn'
        props.cellClass = 'dateISO'
        props.comparator = dateComparator
      }
      //-----------------------------------------------------------
      if (f[k].int) {
        props.vf = intFormatter
        props.tp = 'numberColumn'
        props.filter = 'agNumberColumnFilter'
      }
      //-----------------------------------------------------------
      if (f[k].txt) {
        props.filter = 'agTextColumnFilter'
        if (f[k].large) {
          props.cellEditor = 'agLargeTextCellEditor'
          props.editable = true
          props.wrapText = true
          props.autoHeight = true
          props.flex = true
          props.aggFunc = ''
          props.vgetter = (params) => {
            let ret = opg(params, `data.${k}`, '').toString().replace(/\|/gm, ' \n')
            // console.log(params)
            return ret
          }
          props.vf = (params) => {
            return (params.value || '').toString().replace(/\n/gm, ` | `) //' ꕯ '
          }
          props.valueSetter = (params) => {
            return false
          }
        }
        props.filterParams = { caseSensitive: false, defaultOption: 'contains' }
      }
      //-----------------------------------------------------------
      if (f[k].agg === 'same') {
        props.aggFunc = sameAggFunc
      }
      //-----------------------------------------------------------
      if (f[k].set) {
        props.filter = 'agSetColumnFilter'
      }
      //-----------------------------------------------------------
      props = {
        ...props,
        //
        valueGetter: props.vgetter,
        type: props.tp,
        valueFormatter: props.vf,
        ...(cellRenderer ? [cellRenderer] : []),
        // tooltipField: props.field,
        // tooltipValueGetter: (params) => {
        //     const tooltp = opg(params, `data.${props.field}`, '').toString()//.replace(/\|/gm, '\n')
        //     // console.log(tooltp)
        //     return tooltp
        // }
      }
      delete props.vf
      delete props.vgetter
      delete props.tp
      r.push(React.createElement(AgGridColumn, props))
    }
  }
  return r
}

function loadProfile({ params, _profileId, gridId }) {
  const savedState = JSON.parse(
    window.localStorage.getItem(`gridConf.${gridId}.${_profileId || 'default'}`),
  )
  params.columnApi.applyColumnState({ state: savedState })
}

const generateGetMainMenuItems =
  ({ onBtPrint, ...vars }) =>
  (params) => {
    console.log(vars)
    switch (params.column.getId()) {
      default:
        const menuItems = params.defaultItems.slice(0)
        menuItems.push({
          name: 'Imprimir',
          action: onBtPrint,
        })
        menuItems.push({
          name: 'Perfil de Colunas',
          subMenu: [
            {
              name: 'Salvar Perfil',
              action: () => {
                // save the columns state
                //console.log(params)
                let _profileId = prompt('Qual o nome do Perfil?', `${vars._profileId || 'default'}`)
                const savedState = params.columnApi.getColumnState();
                return;
                if (_profileId)
                  confStore
                    .setConf({
                      domain: 'gridConf',
                      name: `${vars.gridId}.${_profileId}`,
                      data:
                        //  JSON.stringify(
                        savedState,
                      //)
                    })
                    .then(
                      () => updateRemoteConfs(),
                      () => updateRemoteConfs(),
                    )
                //window.localStorage.setItem('defaultGridColumnsConf', JSON.stringify(savedState))
              },
            },
            'separator',
            ...((JSON.parse(window.localStorage.getItem('gridConf')) || {})[vars.gridId] || []).map(
              (name) => ({
                name,
                checked: name === `${vars._profileId || 'default'}`,
                action: () => {
                  loadProfile({ params, gridId: vars.gridId, _profileId: name })
                  return vars.setProfileId ? vars.setProfileId(name) : 0
                },
              }),
            ),
          ],
        })
        return menuItems
    }
  }

// const setPrinterFriendly = (api) => {
//   const eGridDiv = document.querySelector('#myGrid')
//   eGridDiv.style.height = ''
//   // api.setDomLayout('print')
// }

// const setNormal = (api) => {
//   // const eGridDiv = document.querySelector('#myGrid');
//   // eGridDiv.style.width = '700px';
//   // eGridDiv.style.height = '200px';
//   // api.setDomLayout()
// }

function DataGrid({
  columns,
  rowData,
  frameworkComponents,
  sideBar,
  gridId,
  profileId,
  detailCellRenderer,
  ...rest
}) {
  const [gridColumnApi, setGridColumnApi] = useState()
  const [_profileId, setProfileId] = useState(profileId || 'default')
  const gridRef = useRef()
  // const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  // const gridStyle = useMemo(() => ({ height: '200px', width: '700px' }), []);

  const onBtPrint = useCallback(() => {
    // console.log('onBtPrint')
    // console.log(gridRef)
    const api = gridRef.current.api
    //
    // setPrinterFriendly(api)
    const eGridDiv = document.querySelector('#myGrid')
    eGridDiv.style.height = ''
    api.setDomLayout('print')
    //
    setTimeout(function () {
      window.print()
      // setNormal(api)
      const eGridDiv = document.querySelector('#myGrid')
      // eGridDiv.style.width = '700px'
      eGridDiv.style.height = '100%'
      api.setDomLayout()
    }, 2000)
  }, [])

  const onGridReady = (params) => {
    loadProfile({ params, gridId, _profileId })

    setGridColumnApi(params.columnApi)
    if (gridColumnApi) gridColumnApi.autoSizeAllColumns()

    params.api.forEachNode(function (node) {
      node.setExpanded(node.id === '0' && false)
    })
  }

  const onFirstDataRendered = (params) => {
    if (gridColumnApi) gridColumnApi.autoSizeAllColumns()
    params.api.forEachNode(function (node) {
      node.setExpanded(node.id === '0' && false)
    })
  }

  const onGridColumnsChanged = (params) => {
    try {
      params.columnApi.autoSizeAllColumns()
    } catch (e) {
      console.log(e)
    }
  }

  sideBar = opm(sideBar, 'toolPanels', [...opg(sideBar, 'toolPanels', []), 'columns', 'filters'])

  if (!gridId) console.log("'gridId' is a required property")

  return (
    <div style={{ width: '100%', height: '100%' }} className="ag-host">
      <div
        id="myGrid"
        style={{
          height: '100%',
          width: '100%',
        }}
        className="ag-theme-balham"
      >
        <AgGridReact
          // embedFullWidthRows={true}
          //
          getMainMenuItems={generateGetMainMenuItems({
            gridId,
            _profileId,
            setProfileId,
            onBtPrint,
          })}
          //
          onFirstDataRendered={onFirstDataRendered}
          rowData={rowData}
          ref={gridRef}
          defaultColDef={defaultColDef}
          sideBar={sideBar}
          rowGroupPanelShow={'always'}
          enableRangeSelection={true}
          pivotPanelShow={'always'}
          // onGridColumnsChanged={onGridColumnsChanged}
          // onColumnPivotChanged={onGridColumnsChanged}
          onModelUpdated={onGridColumnsChanged}
          onGridReady={onGridReady}
          statusBar={statusBar}
          columnTypes={columnTypes}
          excelStyles={excelStyles}
          // groupIncludeFooter={true}
          groupIncludeTotalFooter={true}
          suppressRowHoverHighlight={false}
          // columnHoverHighlight={true}
          tooltipMouseTrack={true}
          localeText={locale}
          //
          {...(detailCellRenderer === 'false'
            ? {
                //  ref: refx
              }
            : {
                masterDetail: true,
                keepDetailRowsCount: 1,
                frameworkComponents: frameworkComponents,
                detailRowAutoHeight: true,
                detailCellRenderer: detailCellRenderer || 'myDetailCellRenderer',
              })}
        >
          {columns}
        </AgGridReact>
      </div>
    </div>
  )
}

export default DataGrid
