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
import Transactions from './pages/Transactions'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/publicRout'
import { useSelector } from 'react-redux'
import Users from './pages/Users'
import Profile from './pages/Profile'
import Loan from './pages/Loan'



function App() {
  // const {loading} =useSelector(state => state.loaders)

  return (
    <div>
      {/* {loading && <loading/>} */}
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<PublicRoute>  <Login /> </PublicRoute>} />
          <Route path='/register' element={<PublicRoute>  <Register />   </PublicRoute>} />
          <Route path='/' element={<ProtectedRoute><Home /> </ProtectedRoute>} />
          <Route path='/transactions' element={<ProtectedRoute> <Transactions /> </ProtectedRoute>} />
          <Route path='/users' element={<ProtectedRoute> <Users /> </ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
          <Route path='/loan' element={<ProtectedRoute> <Loan /> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>


  )
}

export default App
