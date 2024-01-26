import lazyImport from '../utilities/lazyImport';

const { Favorites } = lazyImport(() => import('../pages'), 'Favorites');

export const protectedRoutes = [
  {
    path: '/favorites',
    element: <Favorites />,
  },
];
