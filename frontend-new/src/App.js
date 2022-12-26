import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Profile, SignIn, SignUp, Logout, Events } from './Pages';
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
            </React.Fragment>
        )}
      </Routes>
    </BrowserRouter>
  );
}
