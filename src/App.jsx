import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  UserProvider  from './providers/UserProvider';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import Home from './views/Home/Home.jsx';
import MyAccount from './views/MyAccount/MyAccount.jsx';
import LoginRegister from './views/LoginRegister/LoginRegister.jsx';
import MyCart from './components/MyCart/MyCart.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div>
      <UserProvider>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/loginRegister' element={<LoginRegister />} />
            <Route path='/miCuenta' element={<MyAccount />} />
            <Route path='/miCarrito' element={<MyCart />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </UserProvider>
    </div>
  )
}

export default App;