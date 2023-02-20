import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';

import { Home } from 'src/pages/home';
import { NotFoundPage } from 'src/pages/404';

import { PUBLIC_ROUTES } from 'src/config/routes';
import { SignIn } from 'src/pages/signIn';
import { SignUp } from 'src/pages/signup';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAccountRequest } from 'src/store/auth/actions';
import { AuthState } from 'src/store/rootReducer';

export const HandleRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    // eslint-disable-next-line no-console
    if (token != null) {
      dispatch(getAccountRequest({ token }));
    }
  }, []);
  const { hasInfo } = useSelector((state: AuthState) => state.auth);
  // eslint-disable-next-line no-console
  console.log({ hasInfo });
  return (
    <Routes>
      <Route path={PUBLIC_ROUTES.default} element={hasInfo ? <Home /> : <SignIn />} />
      <Route path={PUBLIC_ROUTES.signin} element={hasInfo ? <Home /> : <SignIn />} />
      <Route path={PUBLIC_ROUTES.signup} element={hasInfo ? <Home /> : <SignUp />} />

      <Route path={PUBLIC_ROUTES.home} element={hasInfo ? <Home /> : <SignIn />} />
      <Route path={PUBLIC_ROUTES.error404} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={PUBLIC_ROUTES.error404} replace />} />
    </Routes>
  );
};

export default Router;
