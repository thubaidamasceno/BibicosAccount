import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CLink,
  CRow,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import {useAuth} from '../../../auth' 
import { LOGOUT } from '../../../constants/actionTypes'
import * as op from 'object-path'

function Profile () {
  const username = useSelector((state) => op.get(state, `common.currentUser.username`))
  const dispatch = useDispatch()
  const auth = useAuth()
  // console.log()
  return (
    <div
      className={
        'bg-light'//.
        +' min-vh-100 '//
        +' d-flex '//.
        +' flex-row ' //.
        // +' align-items-center' //.
      }
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h2 className="float-start display-3 me-4">Seu Perfil|</h2>
              <h4 className="pt-3">{username}</h4>
              <p className="text-medium-emphasis float-start">
                Para trocar sua senha você deve sair de sua conta e a acessar opção correspondente.
              </p>

              <p className="text-medium-emphasis float-start">
                <CButton  onClick={() => {
            dispatch({ type: LOGOUT })
            auth.signout()
          }}>Sair de minha conta!</CButton>
              </p>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Profile
