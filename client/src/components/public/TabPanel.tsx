import React from 'react';
import { Box } from '@mui/material';

interface Props {
  currentTabValue: string | number;
  tabsValue: string | number;
  children: React.ReactNode;
}

const TabPanel = ({ currentTabValue, tabsValue, children }: Props) => {
  if (tabsValue !== currentTabValue) {
    return null;
  }

  return <Box>{children}</Box>;
};

export default TabPanel;
