import { useContext, useState } from 'react';
import AuthContext from './AuthContext';
import logInFunction from '../api/auth';
import storage from '../utilities/storage';
import { useNavigate } from 'react-router-dom';
import checkForLogIn from '../api/checkForLogin';

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const logIn = async (email, password) => {
    storage.clearToken();
    return await logInFunction(email, password)
      .then((res) => {
        if (res?.token) {
          setUser(res);
          storage.setToken(res.token);
          navigate('/');
        }
        setError(res);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const checkIfLogIn = async (token) => {
    return await checkForLogIn(token)
      .then((res) => {
        setUser(res);
        console.log(res);
        console.log('token found user set')
      })
      .catch((err) => setError(err));
  };

  const authCtx = {
    authUser: user,
    error: error,
    logIn: logIn,
    checkIfLogIn: checkIfLogIn,
  };

  return (
    <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
  );
};

export const UserAuthCtx = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
