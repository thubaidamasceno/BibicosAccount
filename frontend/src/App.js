import React, { Component, useEffect } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import { ProvideAuth, PrivateRoute } from './auth'
import { CSpinner } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { APP_LOAD } from './constants/actionTypes'
import agent from './agent'

const loading = (
  <div className="pt-3 text-center" style={{ height: '100%' }}>
    <div className="sk-spinner sk-spinner-pulse">
      <CSpinner />
    </div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const ResetPassword = React.lazy(() => import('./views/pages/login/ResetPassword'))
const RecoverPassword = React.lazy(() => import('./views/pages/login/RecoverPassword'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: APP_LOAD, payload: agent.Auth.current() })
  }, [])

  return (
    <ProvideAuth>
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Login exact path="/login" name="Entrar" />
            <Route
              exact
              path="/logout"
              name="Entrar"
              render={(props) => {
                return <Login {...props} />
              }}
            />
            <Route
              path="/resetpass"
              name="Trocar Senha"
              render={(props) => <ResetPassword {...props} />}
            />
            <Route
              exact
              path="/recoverpass"
              name="Recuperar Senha"
              render={(props) => <RecoverPassword {...props} />}
            />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <PrivateRoute path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
            {/* <Route exact path="/" name="Page 404" render={(props) => <Page404 {...props} />} /> */}
          </Switch>
        </React.Suspense>
      </HashRouter>
    </ProvideAuth>
  )
}

export default App
