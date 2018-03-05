import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {console.log(window.sessionStorage)}
    </div>
  )
}

export default App
