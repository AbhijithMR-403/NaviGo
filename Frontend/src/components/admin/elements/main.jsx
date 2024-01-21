import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useResponsive } from './hooks/use-responsive';

// import { NAV } from './config-layout';

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }) {
  const lgUp = useResponsive('up', 'lg');
  const HEADER = {
    H_MOBILE: 64,
    H_DESKTOP: 80,
    H_DESKTOP_OFFSET: 80 - 16,
  };
  const NAV = {
    WIDTH: 280,
  };
  
  
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
