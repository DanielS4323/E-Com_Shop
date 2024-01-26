import lazyImport from '../utilities/lazyImport';

const { Login } = lazyImport(() => import('../pages/'), 'Login');


export const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
];
