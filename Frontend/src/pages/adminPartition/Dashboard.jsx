import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Main from '../../components/admin/elements/main';
import Nav from '../../components/admin/navbar/Navbar';
import Header from '../../components/admin/header/Header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        
        <Main>{children}</Main>

      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
