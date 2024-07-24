// components
import {
  Layout,
  Actors,
  Movies,
  Profile,
  MovieInformation,
  Error404,
  ErrorNetwork,
} from './';

// router
import { Route, Routes } from 'react-router-dom';

//
export default function App() {
  //
  // hooks
  // local variables

  //
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Movies />} />
          <Route path='/approved' element={<Movies />} />
          <Route path='/movie/:id' element={<MovieInformation />} />
          <Route path='/actors/:id' element={<Actors />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Route>
        <Route path='*' element={<Error404 />} />
        <Route path='/error' element={<ErrorNetwork />} />
      </Routes>
    </>
  );
}
