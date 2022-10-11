import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Link,
} from '@mui/material';
import { LiveTv, Movie as MovieIcon, Person } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  collapsed: boolean;
}

const Sidebar: React.FC<Props> = ({ collapsed }) => {
  const listItems = [
    {
      name: 'Фильмы',
      icon: MovieIcon,
      link: '/admin/movies',
    },
    {
      name: 'Актеры',
      icon: Person,
      link: '/admin/actors',
    },
  ];

  return (
    <Stack
      sx={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        backgroundColor: (theme) => theme.palette.grey['800'],
        color: 'white',
        width: collapsed ? 70 : 200,
        transition: 'width .3s',
      }}
    >
      <Link
        component={RouterLink}
        color="inherit"
        underline="none"
        to="/admin"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          backgroundColor: (theme) => theme.palette.grey['900'],
        }}
      >
        <LiveTv fontSize="large" />
        {!collapsed && (
          <Typography variant="h6" sx={{ ml: 1, pt: 0.25 }}>
            Movie App
          </Typography>
        )}
      </Link>

      <List sx={{ flex: 1 }}>
        {listItems.map(({ name, icon, link }) => (
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            to={link}
            key={link}
          >
            <ListItem button>
              <ListItemIcon sx={{ ...(collapsed && { minWidth: 'auto' }) }}>
                <Box component={icon} sx={{ color: 'white' }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary={name} />}
            </ListItem>
          </Link>
        ))}
      </List>
    </Stack>
  );
};

export default Sidebar;
