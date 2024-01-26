import { Navigate, useRoutes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import lazyImport from '../utilities/lazyImport';
import ProductDetail from '../components/product/ProductDetail';
import { UserAuthCtx } from '../store/AuthProvider';
import { NotFound } from '../pages';

const { Cart } = lazyImport(() => import('../pages'), 'Cart');

export const AppRoutes = () => {
  const { authUser } = UserAuthCtx();
  const commonRoutes = [
    { path: '/', element: <Navigate replace to="dashboard" /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/product/:id', element: <ProductDetail /> },
    {
      path: '/cart',
      element: <Cart />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];

  const routes = authUser ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
