import React, { MouseEvent, useEffect, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { LiveTv as Logo } from '@mui/icons-material';
import { Role } from '../../types/role';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logout } from '../../store/auth/authSlice';
import { useLazyGetUserQuery } from '../../store/user/userSlice';

const Header: React.FC = () => {
  const pages = [
    {
      name: 'Фильмы',
      link: '/movies',
    },
    {
      name: 'Актеры',
      link: '/actors',
    },
  ];

  const userAuth = useAppSelector((state) => state.auth);
  const [getUser, { data: user }] = useLazyGetUserQuery();
  const dispatch = useAppDispatch();

  const adminPageAccess =
    userAuth && [Role.admin, Role.manager].includes(userAuth.role);

  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!userAuth) {
      return;
    }
    getUser(userAuth.id);
  }, [getUser, userAuth]);

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar disableGutters>
          <Link component={NavLink} to="/" sx={{ display: 'flex' }}>
            <Typography variant="h5" sx={{ color: '#fff', mr: 1 }}>
              Movie
            </Typography>

            <Box
              component={Logo}
              sx={{ width: 30, height: 30, fill: '#fff' }}
            />
          </Link>

          <Box sx={{ display: 'flex', ml: 3 }}>
            {pages.map(({ name, link }) => (
              <Link
                key={name}
                component={NavLink}
                to={link}
                underline="none"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  mx: 1,
                  '&:hover': {
                    color: 'white',
                  },
                  '&.active': {
                    color: 'white',
                  },
                }}
              >
                {name}
              </Link>
            ))}
          </Box>

          {!userAuth && (
            <Link
              component={NavLink}
              to="/login"
              sx={{ color: '#fff', ml: 'auto' }}
            >
              Войти
            </Link>
          )}

          {userAuth && user && (
            <Box sx={{ ml: 'auto' }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={user.profile} alt={user.name}>
                  {user.name
                    .split(' ')
                    .map((value) => value[0].toUpperCase())
                    .join('')}
                </Avatar>
              </IconButton>
              <Menu
                sx={{
                  mt: 1,
                  '& .MuiTypography-root': {
                    width: '100%',
                  },
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    component={RouterLink}
                    to="/user/profile"
                    underline="none"
                    color="inherit"
                  >
                    <Typography>Профиль</Typography>
                  </Link>
                </MenuItem>

                {adminPageAccess && (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link
                      component={RouterLink}
                      to="/admin"
                      underline="none"
                      color="inherit"
                    >
                      <Typography>Панель администратора</Typography>
                    </Link>
                  </MenuItem>
                )}

                <MenuItem onClick={handleCloseUserMenu}>
                  <Link underline="none" color="inherit" onClick={handleLogout}>
                    <Typography>Выйти</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
