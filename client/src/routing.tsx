import React from 'react'
import Auth from './auth/Auth'
import { Route, BrowserRouter } from 'react-router-dom'
import Callback from './components/Callback'
import createHistory from 'history/createBrowserHistory'
import App from './App'
const history = createHistory()

const auth = new Auth(history)

const handleAuthentication = (props: any) => {
  const location = props.location
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}

export const makeAuthRouting = () => {
  return (
    <BrowserRouter>
      <div>
        <Route
          path="/callback"
          Component={(props) => {
            handleAuthentication(props)
            return <Callback />
          }}
        />
        <Route
          Component={(props) => {
            return <App auth={auth} {...props} />
          }}
        />
      </div>
    </BrowserRouter>
  )
}
