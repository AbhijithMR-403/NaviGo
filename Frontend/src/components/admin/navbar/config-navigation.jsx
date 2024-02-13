// import SvgColor from 'src/components/svg-color';

import { Box } from "@mui/material";

// ----------------------------------------------------------------------

{/* <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} /> */}
const icon = (name) => (
  <Box
    component="span"
    className="svg-color"
    // ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(/assets/icons/navbar/${name}.svg) no-repeat center / contain`,
      WebkitMask: `url(/assets/icons/navbar/${name}.svg) no-repeat center / contain`,
      // width: 1,
      // height: 1,
    }}
  />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Bus Stop',
    path: '/admin/bus/stop',
    icon: icon('ic_cart'),
  },
  {
    title: 'Stop List',
    path: '/admin/stoplist',
    icon: icon('ic_blog'),
  },
  {
    title: 'Approval',
    path: '/admin/approval',
    icon: icon('ic_lock'),
  },
  {
    title: 'Stop Connection',
    path: '/admin/bus/connection',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
