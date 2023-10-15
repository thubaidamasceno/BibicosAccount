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
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

const Page404 = () => {
  // console.log()
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! Há algo errado!</h4>
              <p className="text-medium-emphasis float-start">
                Essa seção não pode ser exibida. Já resistramos esse incidente.
              </p>

              <p className="text-medium-emphasis float-start">
                <CLink href="javascript:history.go(-1)">Clique aqui para voltar!</CLink></p>
            </div>
            {/* <CInputGroup className="input-prepend">
              <CInputGroupText>
                <CIcon icon={cilMagnifyingGlass} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="What are you looking for?" />
              <CButton color="info">Search</CButton>
            </CInputGroup> */}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
