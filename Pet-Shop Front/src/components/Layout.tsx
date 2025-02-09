import PropTypes from 'prop-types';
import { ReactNode } from 'react';  
import Header from './Header';

type LayoutProps = {
  children: ReactNode;  
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
