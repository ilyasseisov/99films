// mui
import { Rating, Typography, Box, Stack } from '@mui/material';
// router
import { Link } from 'react-router-dom';
// icons
import imgs from '../../assets/imgs';

export default function Movie() {
  // hooks
  // local variables
  console.log(imgs);
  // functions
  // return
  return (
    <>
      <Link to='google.com'>
        <Stack>
          <img alt={'movie title'} src={imgs.defaultMovieImage} />
          <Stack>
            <img alt='movie rating' src={imgs.star} />
          </Stack>
        </Stack>
      </Link>
    </>
  );
}
