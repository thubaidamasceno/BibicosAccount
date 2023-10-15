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
  CLink,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import agent from '../../../agent'
import ListErrors from './ListErrors'
import { get as opg } from 'object-path'

const RecoverPassword = () => {
  const [sent, setsent] = useState(false)
  const [email, setemail] = useState('')
  const dispatch = useDispatch()

  const [errors, setErrors] = useState()
  const seterrors = (e) => {
    console.log(e)
    const err = opg(e, 'response.body.info.message')
    setErrors(err ? [err] : null)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                {!sent && (
                  <CForm>
                    <h3>Esqueceu Sua Senha ou é seu Primeiro Acesso!?</h3>
                    <p className="text-medium-emphasis">
                      Informe seu email. Já te mando um link para criar uma nova senha
                    </p>
                    <ListErrors errors={errors} />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(ev) => {
                          setemail(ev.target.value)
                        }}
                        value={email}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton
                        color="success"
                        onClick={(ev) => {
                          dispatch(() => {
                            const r = agent.Auth.recover({ email })
                            return r.then(
                              (res, err) => {
                                // setsent(true)
                                if (err) console.log(err)
                              },
                              (b) => seterrors(b),
                            )
                          }).then(
                            () => {
                              setsent(true)
                            },
                            (b) => seterrors(b),
                          )
                        }}
                      >
                        Solicitar Link
                      </CButton>
                    </div>
                  </CForm>
                )}
                {sent && (
                  <>
                    <h2>Um link foi enviado para o email informado</h2>
                    <h5>Utilize o link recebido para cadastrar sua senha</h5>
                    <CLink href="#/login">
                      <CButton> Voltar</CButton>
                    </CLink>
                  </>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default RecoverPassword
