import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarElements from "./components/Navbar/NavbarElements";
import Footer from './components/Footer/Footer';
import React from 'react';
import LandPage from './Pages/MainPage/LandPage';
import FormLogin from './Pages/Forms/FormLogin';
import FAQ from './Pages/FAQ/FAQ'
import AdsPage from './Pages/Bullboard/adsPage';
import Form from './Pages/Forms/Form';
import OurFarmers from './Pages/ourfarmers/OurFarmers';
import ProfileSettings from './Pages/Settings/profileSettings';
import './App.css';
import UseToken from './Pages/Forms/UseToken';

function App() {
  const { token, removeToken, setToken } = UseToken();



  return (
    <BrowserRouter>
      <div >
        <NavbarElements token={token} removeToken={() => { removeToken(); }} />
        <div>
        <Routes>
            <Route path='/home' element={
             <>
                <LandPage/>
                <Footer token={token} />

              </>
            } />
            <Route path="/signup" element={<Form setToken={setToken} />} />
            <Route path='/login' element={
              <>
                <FormLogin setToken={setToken} />
                <Footer token={token}/>

              </>
            } />
            <Route path='/bullboard' element={
              <>
                <AdsPage token={token} />
              </>
            } />
            <Route path='/ourfarmers' element={
              <>
                <OurFarmers token={token}/>
              </>
            } />
            <Route path='/faq' element={
              <>
                <FAQ />
                <Footer token={token}/>
              </>
            } />
            <Route path="/" element={
              <>
                <LandPage/>
                <Footer token={token}/>

              </>
            } />
            {token && token !== "" && token !== undefined && (
              <>
                <Route path="/settings" element={
                  <>
                    <ProfileSettings token={token} setToken={setToken} />
                    <Footer token={token}/>

                  </>
                } />
              </>
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
