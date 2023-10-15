import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../auth'
import avatar8 from './../../assets/images/avatars/8.jpg'
import { LOGOUT } from '../../constants/actionTypes'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const auth = useAuth()

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="#/profile">
          <CIcon icon={cilUser} className="me-2" />
          Meu Perfil
        </CDropdownItem>
        <CDropdownItem
          //</CDropdownMenu>href="#/logout"
          onClick={() => {
            dispatch({ type: LOGOUT })
            auth.signout()
          }}
        >
          <CIcon icon={cilLockLocked} className="me-2" />
          Sair
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
