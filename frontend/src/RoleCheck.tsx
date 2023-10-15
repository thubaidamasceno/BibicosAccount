import { ReactComponentElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as op from 'object-path'

import userRoles from './userRoles'
import { History, Location } from 'history'
import { match, StaticContext } from 'react-router'

const RoleCheck = (propx: { [x: string]: any; Comp: any; userRolesAbility: any; RBAC: any; placeHolder: any; history?: History<unknown>; location?: Location<unknown>; match?: match<{ [x: string]: string }>; staticContext?: StaticContext }) => {
  const { Comp, userRolesAbility, RBAC, placeHolder, ...props } = propx

  let can = true
  for (let k in RBAC) {
    if (!userRolesAbility.can(RBAC[k], k)) {
      can = false
      break
    }
  }
  if (can) {
    return <Comp {...props} />
  } else {
    return (
      <div>
        {placeHolder || 'O usuário que você está usando não possue permissão para este acesso'}
      </div>
    )
  }
}

export default RoleCheck
