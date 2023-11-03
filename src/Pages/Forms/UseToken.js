import { useState } from 'react';

function UseToken() {
  const getToken = () => {
    return localStorage.getItem('token') || null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    token,
    setToken: saveToken,
    removeToken,
  };
}

export default UseToken;
