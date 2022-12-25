import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Profile, SignIn, SignUp, Logout } from './Pages';
import useToken from './useToken';

export default function App() {

  const { token } = useToken();
  
  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
            <React.Fragment>
                <Route path="/" element={<SignIn/>} />
                <Route path="/signup" element={<SignUp/>} />
            </React.Fragment>
        ) : (
            <React.Fragment>
                <Route path="/" element={<Profile/>} />
                <Route path="/logout" element={<Logout/>} />
            </React.Fragment>
        )}
      </Routes>
    </BrowserRouter>
  );
}
