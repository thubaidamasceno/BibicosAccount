import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'
import routes from '../routes'
import { Redirect, Route, Switch } from 'react-router-dom'
import { get as opg } from 'object-path'
import { useSelector } from 'react-redux'
import userRoles from '../userRoles'
import RoleCheck from '../RoleCheck'

export const AppSidebarNav = ({ items }) => {
  const role = useSelector((state) => opg(state, `common.role`))
  const location = useLocation()
  const userRolesAbility = userRoles(role)
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
            activeClassName: 'active',
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <>
      {/* {JSON.stringify(routes)} */}
      <Switch>
        {routes.map((route, idx) => {
          return (
            route.leftbar && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) =>
                  RoleCheck({
                    ...props,
                    Comp: route.leftbar,
                    userRolesAbility,
                    RBAC: route.RBAC,
                    placeHolder: <></>,
                  })
                }
                //render={(props) => React.createElement(route.leftbar, props)}
              />
            )
          )
        })}
        {/* <Redirect from="/" to="/dashboard" /> */}
      </Switch>
    </>
  )
  // return (
  //   <React.Fragment>
  //     {items &&
  //       items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
  //   </React.Fragment>
  // )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
