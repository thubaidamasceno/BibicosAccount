import {
  CButtonGroup,
  CContainer,
  CFormCheck,
  CFormSwitch,
  CNav,
  CNavTitle,
  CFormSelect,
  CNavItem,
  CNavLink,
  CHeaderDivider,
  CButtonToolbar,
  CButton,
} from '@coreui/react'
import * as op from 'object-path'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { at, mod } from './modconf'
import { apiActs } from './reducers'
import { useAuth } from '../../auth'
import { LOGOUT } from '../../constants/actionTypes'

function DataSource() {
  const dispatch = useDispatch()
  const auth = useAuth()

  return (
    <div className="lefbar">
      <CNav className="flex-column" layout="justified">
        <CNavItem>
          <CNavLink href="#">NOVA OPERAÇÂO</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Lista de Operações</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Plano de Contas</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Parceiros</CNavLink>
        </CNavItem>
        <CNavTitle>Livro Contábil</CNavTitle>
        <CNavItem>
          <CFormSelect size="sm" className="mb-3">
            <option>Livro Contábil Padrão</option>
          </CFormSelect>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Gerenciar Livros</CNavLink>
        </CNavItem>
        <CNavTitle> </CNavTitle>
        <CNavItem>
          <CNavLink href="#/profile">Meu perfil</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="https://github.com/thubaidamasceno/BibicosAccount" target="_blank">
            Ajuda
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            href="#"
            onClick={() => {
              dispatch({ type: LOGOUT })
              auth.signout()
            }}
          >
            Sair
          </CNavLink>
        </CNavItem>
      </CNav>
    </div>
  )
}

export default DataSource
