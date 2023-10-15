import React from 'react'
//
import profile from './views/pages/profile'
//
import produtosArameA from './mod/operationsA'
import dashboard from './mod/dashboard'



const routes = [
  { path: '/', exact: true, name: 'Home' , leftbar:(()=>(<>home</>))},
  { path: '/profile', exact: true, name: 'Pefil' ,component: profile, leftbar:(()=>(<></>))},
  ...produtosArameA.routeData,
  ...dashboard.routeData,
]

export default routes
