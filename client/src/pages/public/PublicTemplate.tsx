import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';

const PublicTemplate = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicTemplate;
