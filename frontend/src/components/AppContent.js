import { CContainer, CSpinner } from '@coreui/react'
// import op from 'object-path'
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
// import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
// routes config
import routes from '../routes'
import { get as opg } from 'object-path'
import RoleCheck from '../RoleCheck'
import userRoles from '../userRoles'

const AppContent = () => {
  const role = useSelector((state) => opg(state, `common.role`))
  const userRolesAbility = userRoles(role)
  // const currentUser = useSelector(state => op.get(state, 'common.currentUser'))
  //const redirectTo = useSelector(state => opg(state, 'common.redirectTo'))
  return (
    <CContainer fluid className="no-pad">
      {
        // currentUser ?
        <Suspense fallback={<CSpinner color="primary" />}>
          <Switch>
            {/* {redirectTo && <Redirect from="/" to={redirectTo} />} */}
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) =>
                      RoleCheck({
                        ...props,
                        Comp: route.component,
                        userRolesAbility,
                        RBAC: route.RBAC,
                      })
                    }
                  />
                )
              )
            })}
            <Redirect from="/profile" exact to="/profile" />
            <Redirect from="/" exact to="/dashboard" />
            <Redirect from="/" to="/404" />
          </Switch>
        </Suspense>
        // :
        // <Switch>
        //   <Redirect from="/" exact to="/login" />
        // </Switch>
      }
    </CContainer>
  )
}

export default React.memo(AppContent)
