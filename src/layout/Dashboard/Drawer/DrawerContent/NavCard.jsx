// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';

// assets
import logo from 'assets/images/logo/logo.png';
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

export default function NavCard() {
  return (
    <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
      <Stack alignItems="center">
        <CardMedia component="img" image={logo} sx={{ width: 112 }} />
        <Stack alignItems="center" mb={2}>
          <Typography variant="h5">Eatasy Admin</Typography>
          <Typography variant="h6" color="secondary">
            Maintained by Acmeflare
          </Typography>
        </Stack>
        <AnimateButton>
          <Button component={Link} target="_blank" href="mailto:support@acmeflare.in" variant="contained" color="success" size="small">
            Need Help ?
          </Button>
        </AnimateButton>
      </Stack>
    </MainCard>
  );
}
