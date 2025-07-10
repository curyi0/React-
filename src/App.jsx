import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Info from './components/Info'
import View from './components/View'
import Product from './components/Product'


function App() {

  return (
    <>
      <ul>
        <li><Link to="/info">정보입력</Link></li>
        <li><Link to="/product">상품등록</Link></li>
      </ul>
      <Routes>
        <Route path='/info' element={<Info/>} />
        <Route path='/view' element={<View/>} />
        <Route path='/product' element={<Product/>} />
      </Routes>
    </>
    
  )
}

export default App
