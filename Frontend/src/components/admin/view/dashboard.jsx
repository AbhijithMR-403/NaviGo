import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppWidgetSummary from '../elements/app-widget-summary';
import { useEffect, useState } from 'react';
import { AdminAxios } from '../../api/api_instance';
// import Iconify from '../elements/iconify/iconify';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const [Data, setData] = useState({})
  useEffect(()=>{
    AdminAxios.get('/dashboard').then((res)=>{
      setData(res.data)
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        {/* <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Weekly Sales"
            total={7}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid> */}

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users"
            total={Data.user_count}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Orders"
            total={Data.order_count}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Transaction"
            total={'₹'+Data.total_amt}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        
      </Grid>
    </Container>
  );
}
