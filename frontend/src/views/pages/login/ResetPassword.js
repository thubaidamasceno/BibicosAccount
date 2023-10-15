import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow
} from '@coreui/react'
import React, { useState } from 'react'
import {
  Router,
  Redirect,
  useLocation,
} from "react-router-dom"
import { useDispatch } from 'react-redux'
import agent from '../../../agent'
import ListErrors from './ListErrors'
import { get as opg } from 'object-path'


function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ResetPassword = () => {
  const query = useQuery()
  const [pass, setpass] = useState('')
  const [confirm, setconfirm] = useState('')
  const [sent, setsent] = useState(false)

  const dispatch = useDispatch()
  const [errors, setErrors] = useState()
  const seterrors = e => {
    console.log(e)
    const err = opg(e, 'response.body.info.message')
    setErrors(err ? [err] : null)
  }
  
  const email = query.get("email")
  const token = query.get("token")

  console.log({ email, token })

  return sent ? <Redirect to='/login' /> : (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Criar Senha</h1>
                  <p className="text-medium-emphasis">Digite e confirme sua nova senha</p>
                    <ListErrors errors={errors} />
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Senha"
                      autoComplete="new-password"
                      onChange={(ev) => {
                        setpass(ev.target.value)
                      }}
                      value={pass}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repita a Senha"
                      autoComplete="new-password"
                      onChange={(ev) => {
                        setconfirm(ev.target.value)
                      }}
                      value={confirm}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success"
                      disabled={!pass || pass !== confirm}
                      onClick={(ev) => {
                        dispatch(() => agent.Auth.resetpass({ email, pass, token }).then(
                          (res, err) => {
                            // setsent(true)
                            if (err)
                              console.log(err)
                          },
                          (err) => { console.log(err) }
                        )).then(() => {
                          setsent(true)
                          // location.replace({ path: '/' })
                        })
                      }}
                    >Criar Senha</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}


export default ResetPassword
