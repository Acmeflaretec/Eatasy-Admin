// material-ui
import { PlusOutlined } from '@ant-design/icons';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  return (
    <MainCard title="Sample Card">
      <Button variant='contained' component={Link} href='/dashboard'><PlusOutlined/>{" "} Create</Button>
      <Link hrefLang='/dashboard' href={'/dashboard'}>click</Link>
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
        reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
        officiate descent molls anim id est labours.
      </Typography>
    </MainCard>
  );
}
