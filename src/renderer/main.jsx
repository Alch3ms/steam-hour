import React from 'react'
import ReactDOM from 'react-dom/client'
import RoutesPage from './pages/routes'
import './styles/global.scss'
import {MemoryRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MemoryRouter>
      <RoutesPage />
    </MemoryRouter>
  </React.StrictMode>,
)
