// importa componentes da pasta, mas não permite ser importado por nenhum script da pasta
import { lazy } from 'react'
import { dashboard, dashboardCommon, sagas } from './reducers'
import Leftbar from './Leftbar';

const App = lazy(() =>
  import ('./App'))
// const Leftbar = lazy(() => import('./Leftbar'))

export const routeData = [{
  path: '/dashboard/:report',
  exact: false,
  name: 'Situação de Pedidos',
  component: App,
  leftbar:Leftbar 
},{
    path: '/dashboard',
    exact: true,
    name: 'Situação de Pedidos',
    component: App,
    leftbar:Leftbar 
  },
];

export const routes = []

export const menuitems = []

const exp = {
  mod: 'dashboard',
  red: dashboard,
  rc: dashboardCommon,
  men: [],
  rot: [],
  sagas,
  routeData
}

export default exp
