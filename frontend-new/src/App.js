import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Profile, SignIn, SignUp, Logout, Events, Clients } from './Pages';
import Actors from './Pages/Actors';
import Orders from './Pages/Orders';
import useToken from './useToken';

export default function App() {

  const { token } = useToken();
  
  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
            <React.Fragment>
                <Route path="/" element={<SignIn/>} />
                <Route path="/signup1" element={<SignUp/>} />
            </React.Fragment>
        ) : (
            <React.Fragment>
                <Route path="/" element={<Profile/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/events" element={<Events/>} />
                <Route path="/actors" element={<Actors/>} />
                <Route path="/orders" element={<Orders/>} />
                <Route path="/clients" element={<Clients/>} />
            </React.Fragment>
        )}
      </Routes>
    </BrowserRouter>
  );
}
