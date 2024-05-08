import { MovieFilterRounded } from '@mui/icons-material';
import SvgColor from '../../../components/svg-color';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MovieFilterRoundedIcon from '@mui/icons-material/MovieFilterRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import SearchIcon from '@mui/icons-material/Search';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'home',
    path: '/dashboard/app',
    icon: <HomeRoundedIcon sx={{ width: 1, height: 1 }}/> ,
  },
  {
    title: 'Search',
    path: '/dashboard/search',
    icon: <SearchIcon sx={{ width: 1, height: 1 }}/>
  },
];

export default navConfig;
