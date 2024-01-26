import { createContext } from 'react';

const AuthContext = createContext({
  authUser: {},
  error: {},
  logInFn: () => {},
  checkIfLogIn: () => {},
});

export default AuthContext;
