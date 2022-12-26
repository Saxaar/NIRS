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

  const getUser = async () => {
    const userString = localStorage.getItem('user');
    const userData = JSON.parse(userString);
    return userData?.user;
  };

  const [token, setToken] = useState(getToken());
  const [isAdmin, setAdmin] = useState(getAdmin());
  const [user, setUser] = useState(getUser());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
    setAdmin(userToken.isAdmin);
  };

  const saveUser = userData => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData.user)
  }

  return {
    setToken: saveToken,
    token,
    isAdmin,
    user,
    setUser: saveUser
  }
}