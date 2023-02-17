import React from 'react';
import Head from 'next/head';
import MainHeader from './main-header';

const Layout = (props) => {
  return (
    <>
      <MainHeader />
      <main>
        {props.children}
      </main>
    </>
  );
};

export default Layout;
