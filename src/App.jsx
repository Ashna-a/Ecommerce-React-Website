import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout'
import NavBar from './components/NavBar'

function App() {
  return (
   <div className='app'>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<div> <h1> 404 NOT FOUND </h1></div>} />
    </Routes> 

   </div>
  )
}

export default App
