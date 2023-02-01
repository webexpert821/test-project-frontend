import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';

import { Home } from 'src/pages/home';
import { NotFoundPage } from 'src/pages/404';

import { PUBLIC_ROUTES } from 'src/config/routes';
import { SignIn } from 'src/pages/signIn';
import { SignUp } from 'src/pages/signup';

export const HandleRouter = () => {
  return (
    <Routes>
      <Route path={PUBLIC_ROUTES.default} element={<Home />} />
      <Route path={PUBLIC_ROUTES.home} element={<Home />} />
      <Route path={PUBLIC_ROUTES.signin} element={<SignIn />} />
      <Route path={PUBLIC_ROUTES.signup} element={<SignUp />} />
      <Route path={PUBLIC_ROUTES.error404} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={PUBLIC_ROUTES.error404} replace />} />
    </Routes>
  );
};

export default Router;
