import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as op from 'object-path'
import moment from 'moment'
import { mod, act } from './modconf'
import ReactApexChart from 'react-apexcharts'
import numeral from 'numeral'

numeral.register('locale', 'pt-br', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'mi',
    billion: 'bi',
    trillion: 'tri',
  },
  // ordinal : function (number) {
  //     return number === 1 ? 'er' : 'ème';
  // },
  currency: {
    symbol: 'R$',
  },
})

// switch between locales
try {
  numeral.locale('pt-br')
} catch {}

//
function ApexChartA({ xs, ys, vs }) {
  const dt = {
    series: [
      {
        name: 'Receitas',
        type: 'line',
        data: ys,
      },
      {
        name: 'Despesas',
        type: 'line',
        data: vs,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        toolbar: { show: false },
      },
      plotOptions: {
        column: {
          // borderRadius: 10,
          dataLabels: {
            position: 'bottom', // top, center, bottom
            // formatter: function (val) {
            //     return numeral(val).format('($0.0a)') //+ "%";
            // },
          },
        },
        // bar: {
        //   // borderRadius: 10,
        //   dataLabels: {
        //     position: 'bottom', // top, center, bottom
        //     // formatter: function (val) {
        //     //     return numeral(val).format('($0.0a)') //+ "%";
        //     // },
        //   },
        // },
        line: {
          // borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        // enabledOnSeries: [1],
        formatter: function (val, opt) {
              return numeral(val).format('($0a)') //+ "%";
        },
        offsetY: -20,
        // style: {
        //     fontSize: '12px',
        //     colors: ["#fff",'#000']
        // },
      },
      tooltip: {
        enabled: true,
      },
      xaxis: {
        categories: xs,
        position: 'bottom',
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      colors: [ "#247BFF","#FF1654",],
      yaxis: [
        {
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: true,
          },
          labels: {
            show: true,
            formatter: function (val) {
              return val //+ "%";
            },
          },
        },
        {
          opposite: true,
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: true,
          },
          labels: {
            show: true,
            formatter: function (val) {
              return numeral(val).format('$0.0a') //+ "%";
            },
          },
        },
      ],
      legend: { position: 'top' },
    },
  }

  return (
    <div id="chart">
      <ReactApexChart
        options={dt.options}
        series={dt.series}
        // type="bar"
        height={350}
      />
    </div>
  )
}

function ChartBoard({ conf }) {
  const data = useSelector((state) => op.get(state, `${mod}.data`, []))
  const dispatch = useDispatch()

  useEffect(
    () => {
      let p = {
        type: act.load,
      }
      dispatch(p)
    },
    [
      // dispatch
    ],
  )

  const xs = data.map((d) => d.x)
  const ys = data.map((d) => d.y)
  const vs = data.map((d) => d.v)

  return (
    <>
      <div
        className="col-12"
        // style={{ display: 'flex' }}
      >
        <div className="card mb-4 mt-4">
          <div className="card-header">Receitas e Despesas Mensais</div>
          <div className="card-body">
            <ApexChartA xs={xs} ys={ys} vs={vs} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChartBoard
