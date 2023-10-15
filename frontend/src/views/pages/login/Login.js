import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText, CLink, CRow
} from '@coreui/react'
import { get as opg } from 'object-path'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Redirect,
  Route, useHistory,
  useLocation
} from "react-router-dom"
import agent from '../../../agent'
import { useAuth } from '../../../auth'
import { LOGIN } from '../../../constants/actionTypes'
import ListErrors from './ListErrors'

function LoginRoute({ children, render, ...rest }) {
  const auth = useAuth();
  let history = useHistory();
  return (
    <Route
      {...{ ...rest, children }}
      render={({ location, ...rest2 }) => {
        if (auth.role) {
          let from = history.location.pathname;
          from = from === '/login' ? '/' : from
          // console.log({ history })
          return (
            <Redirect
              to={{
                pathname: from,
              }}
            />
          )
        } else {
          return (
            <Login />
          )
        }
      }
      }
    />
  );
}

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState()
  // const errors = useSelector(state => op.get(state, 'auth.errors'))
  const auth = useAuth()
  const seterrors = e => {
    const err = opg(e, 'response.body.info.message')
    setErrors(err ? [err] : null)
  }

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    method='post'
                    onSubmit={(ev) => {
                      ev.preventDefault()
                      dispatch(
                        (a, b) => {
                          return agent.Auth.login(username, password)
                        }).then((a) => {
                          if (a)
                            dispatch({ type: LOGIN, payload: a })
                          // else
                          //   seterrors(b)
                          return a
                        }, b => seterrors(b)).then(
                          (a) => {
                            auth.signin();
                            if (a) {
                              history.replace(from);
                              // else
                              seterrors()
                            }
                          }, b => seterrors(b))
                      return false
                    }}
                  >
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Bem vind@!</p>
                    <ListErrors errors={errors} />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        value={username}
                        onChange={(ev) => {
                          setUsername(ev.target.value)
                        }}
                        placeholder="email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        onChange={(ev) => {
                          setPassword(ev.target.value)
                        }}
                        value={password}
                        placeholder="senha"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4"
                          type='submit'
                        // onClick={ }
                        >
                          Entrar
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CLink href="#/recoverpass" >
                          <CButton color="link" className="px-0">
                            Não tem ou Esqueceu sua senha?
                          </CButton></CLink>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2 style={{ color: 'red' }}>BibicosAccount
                    </h2>
                    <p>
                      Solução de controle financeiro para Casais e Famílias.
                    </p>
                    <p><b>Seu Login de acesso é o seu email. Caso ainda não tenha senha, a receberá por email um link para criá-la!</b></p>
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div >
  )
}

export default LoginRoute
