import op from 'object-path';
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {
  Redirect, Route
} from "react-router-dom";

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


function useProvideAuth() {
  const [role, setRole] = useState(window.localStorage.getItem('role'));

  // useEffect(() => {
  //   let r = window.localStorage.getItem('role')
  //   setRole(r)
  //   console.log(['rolou', r])
  // }, [])

  // console.log(['rolou', role])
  const signin = cb => {
    setRole(window.localStorage.getItem('role'));
  };

  const signout = cb => {
    setRole(null);
  };

  return {
    // username,
    role,
    signin,
    signout,
  };
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, render, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...{ ...rest, children }}
      render={({ location, ...rest2 }) =>
        auth.role ? (
          render({ location, ...rest2 })
          //children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
