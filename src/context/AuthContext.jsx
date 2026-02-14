import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    // This is a mock signup function.
    // In a real app, you would make an API call to your backend.
    return new Promise((resolve, reject) => {
      if (email && password) {
        const user = { email };
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      } else {
        reject('Signup failed');
      }
    });
  }

  function login(email, password) {
    // This is a mock login function.
    // In a real app, you would make an API call to your backend.
    return new Promise((resolve, reject) => {
      if (email && password) {
        const user = { email };
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      } else {
        reject('Login failed');
      }
    });
  }

  function logout() {
    return new Promise((resolve) => {
      sessionStorage.removeItem('currentUser');
      setCurrentUser(null);
      resolve();
    });
  }

  useEffect(() => {
    // This is where you might check if a user is already logged in
    // for example, by checking localStorage for a token.
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
