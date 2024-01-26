import { Fragment } from 'react';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};

export default MainLayout;
