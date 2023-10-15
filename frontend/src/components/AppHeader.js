import { cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logo } from 'src/assets/brand/logo'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.common.sidebarShow)
  const isDev = process.env.NODE_ENV !== 'production'
  const opt2 = (
    <CHeader
      position="sticky" className="mb-4"
    >
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CNav>
              <CNavItem ><CNavLink href="#/dashboard">Dashboard</CNavLink></CNavItem>
              <CNavItem ><CNavLink href="#/dashboard">+Operação</CNavLink></CNavItem>
         
        </CNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
  return opt2
}

export default AppHeader
