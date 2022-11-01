import { useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import adminRoutes from './routes/adminRoutes';
import publicRoutes from './routes/publicRoutes';
import { useAppDispatch, useAppSelector } from './hooks/store';
import { logout } from './store/auth/authSlice';

function App() {
  const routes = useRoutes([...adminRoutes, ...publicRoutes]);

  const { pathname } = useLocation();
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // check token expiration
    if (!user) {
      return;
    }
    if (user.exp * 1000 < Date.now()) {
      dispatch(logout());
    }
  }, [dispatch, pathname, user]);

  return (
    <>
      <CssBaseline />
      {routes}
    </>
  );
}

export default App;
