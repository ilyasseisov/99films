// react
import { useState, useEffect } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// router
import { useLocation } from 'react-router-dom';

// mui
import { InputBase } from '@mui/material';
// mui icons
import { Search as SearchIcon, ClearRounded } from '@mui/icons-material';

// styled
import { styled, alpha } from '@mui/material/styles';

// redux actions
import { searchMovie } from '../../features/currentGenreOrCategorySlice';

// styling
const SearchInput = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  transition: 'all 0.3s ease-out',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  top: 0,
  left: 0,
}));

const SearchIconWrapperX = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  right: 0,
  cursor: 'pointer',
  zIndex: 2,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 1, 2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export default function Search() {
  // hooks
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  // local variables
  // functions
  // search movie
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      dispatch(searchMovie(searchQuery));
    }
  }

  // clear search
  function clearSearch() {
    setSearchQuery('');
  }
  // return
  // display only when on homepage
  if (location.pathname !== '/') return null;

  // primary return
  return (
    <>
      <SearchInput>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <SearchIconWrapperX
          onClick={clearSearch}
          sx={{ display: searchQuery ? 'flex' : 'none' }}
        >
          <ClearRounded
            sx={{
              fontSize: 24,
              transition: 'all 0.3s ease-out',
              '&:hover': {
                transform: 'rotate(90deg)',
              },
            }}
          />
        </SearchIconWrapperX>
        <StyledInputBase
          placeholder='Search…'
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </SearchInput>
    </>
  );
}
