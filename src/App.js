import React from 'react'
import { TabBar, NavBar } from "./components/Layouts"
import { renderRoutes } from 'react-router-config'
import routes from './routes'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"
import store from "./store"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-main">
          <NavBar />
          <div className='app-content'>
            {renderRoutes(routes)}
          </div>
          <TabBar />
        </div>
      </Router>
    </Provider>
  )
}

export default App;