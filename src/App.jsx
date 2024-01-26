import { Suspense, useEffect } from 'react';
import MainLayout from './components/Layout/MainLayout';
import { AppRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { Row } from 'react-bootstrap';
import AuthContextProvider, { UserAuthCtx } from './store/AuthProvider';
import { Provider } from 'react-redux';
import store from './store/cartIndex';
import storage from './utilities/storage';

function App() {
  const queryClient = new QueryClient();

  const { checkIfLogIn,authUser } = UserAuthCtx();
  const token = storage.getToken();
  // console.log(token)

  useEffect(() => {
    console.log('useeffect fired')
    checkIfLogIn(token);
    console.log(authUser);
    return () => {
      checkIfLogIn(token);
    };
  }, [token]);

  

  return (
    <Suspense
      fallback={
        <Row className="d-flex justify-content-center align-items-center">
          <LoadingSpinner
            variant="primary"
            animation="border"
            role="status"
            size="xxl"
          />
        </Row>
      }
    >
      <Router>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <Provider store={store}>
              <MainLayout>
                <AppRoutes />
              </MainLayout>
            </Provider>
          </AuthContextProvider>
        </QueryClientProvider>
      </Router>
    </Suspense>
  );
}

export default App;
