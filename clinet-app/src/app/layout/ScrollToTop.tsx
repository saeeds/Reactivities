import { useEffect } from 'react';
import { withRouter } from 'react-router';
import React, { Fragment } from 'react';

const ScrollToTop = ({ children, location: { pathname } }: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Fragment>{children}</Fragment>;
};

export default withRouter(ScrollToTop);
