import React, { createContext, useReducer } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';
import Logout from './components/Logout';
import Stocks from './components/Stocks';
import ForgotPass from './components/ForgotPass';
import ConfirmPass from './components/ConfirmPass';
import ChangePassword from './components/ChangePassword';
// import Filter from './components/Filter';
import Getedit from './components/getbhvy'
import { initialState, reducer } from "../src/reducer/UseReducer"
export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (


    <>


      <UserContext.Provider value={{ state, dispatch }}>

        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/service' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/stocks' element={<Stocks />} />

          < Route path='/login' element={<Login />} />
          < Route path='/forgot-password' element={<ForgotPass />} />
          < Route path='/reset-password' element={<ConfirmPass />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          {/* <Route path='/filter' element={<Filter/>}/>  */}
          <Route path='/getbhvy' element={<Getedit />} />
          <Route path='/changepassword' element={<ChangePassword />} />
        </Routes>
      </UserContext.Provider>
      <Footer />
    </>
  );
}

export default App;
