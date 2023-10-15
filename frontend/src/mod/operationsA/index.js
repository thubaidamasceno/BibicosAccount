// importa componentes da pasta, mas não permite ser importado por nenhum script da pasta
import { lazy } from 'react'
import { mod } from './modconf'
import reducers, { sagas } from './reducers'
import { userDomains } from '../../userRoles'
const operationsA = lazy(() => import('./operationsA'))
const DataSourceArameA = lazy(() => import('./DataSourceA'))

export const routeData = [
  // { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  {
    path: '/operationsA',
    exact: false,
    name: 'Lista de Operações',
    component: operationsA,
    leftbar: DataSourceArameA,
    // RBAC: { [userDomains.producao]: 'l1' },
  },
]

const exp = {
  mod,
  red: reducers.reducer,
  rc: reducers.commonReducer,
  sagas: reducers.sagas,
  routeData,
}

export default exp
