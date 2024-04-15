// component
import { MovieFilterRounded } from '@mui/icons-material';
import SvgColor from '../../../components/svg-color';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MovieFilterRoundedIcon from '@mui/icons-material/MovieFilterRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


const navConfig = [
  {
    title: 'home',
    path: '/dashboard/app',
    icon: <HomeRoundedIcon sx={{ width: 1, height: 1 }}/> ,
  },
  {
    title: 'My lists',
    path: '/dashboard/products',
    icon: <MovieFilterRoundedIcon sx={{ width: 1, height: 1 }}/>
  },
  {
    title: 'login',
    path: '/login',
    icon: <VpnKeyRoundedIcon sx={{ width: 1, height: 1 }}/>,
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
