// router
import { Route, Routes } from 'react-router-dom';
// components
import { Actors, Movies, Profile, MovieInformation } from '..';

export default function Router() {
  // hooks
  // local variables
  // functions
  // return
  return (
    <>
      <Routes>
        <Route path='/' element={<Movies />} />
        <Route path='/approved' element={<Movies />} />
        <Route path='/movie/:id' element={<MovieInformation />} />
        <Route path='/actors/:id' element={<Actors />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
    </>
  );
}
