import './App.css'
import './stylesheets/text-elements.css'
import './stylesheets/form-elements.css'
import './stylesheets/theme.css'
import './stylesheets/layout.css'
import './stylesheets/alignments.css'
import './stylesheets/custom-components.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/publicRout'



function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<PublicRoute>  <Login /> </PublicRoute>  } />
          <Route path='/register' element={<PublicRoute>  <Register/>   </PublicRoute>  } />
          <Route path='/' element={ <ProtectedRoute><Home /> </ProtectedRoute>      } />
        </Routes>
      </BrowserRouter>
    </div>


  )
}

export default App
