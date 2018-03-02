import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Reviews from './componoent/Reviews'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Reviews />
    </div>
  )
}

export default App
