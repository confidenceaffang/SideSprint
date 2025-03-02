import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../components/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import api from '../components/services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get the ID token
          const idToken = await user.getIdToken();
          
          // Verify with backend and get user data
          const response = await api.post('/auth/verify', {
            uid: user.uid,
            token: idToken
          });

          // Set user data including backend info
          setCurrentUser({
            ...user,
            ...response.data.user
          });

          // Store token
          localStorage.setItem('token', response.data.token);
        } catch (error) {
          console.error('Error verifying user:', error);
          setCurrentUser(null);
          localStorage.removeItem('token');
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem('token');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};