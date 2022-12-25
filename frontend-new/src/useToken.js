import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const getAdmin = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.isAdmin;
  };

  const [token, setToken] = useState(getToken());
  const [isAdmin, setAdmin] = useState(getAdmin());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
    setAdmin(userToken.isAdmin);
  };

  return {
    setToken: saveToken,
    token,
    isAdmin
  }
}