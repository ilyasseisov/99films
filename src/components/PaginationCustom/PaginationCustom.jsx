// mui
import {
  Pagination,
  PaginationItem,
  Stack,
  useMediaQuery,
} from '@mui/material';
// mui icons
import { ArrowBack, ArrowForward } from '@mui/icons-material';

export default function PaginationCustom({ totalPages, setPage, currentPage }) {
  // hooks
  const isSmBreakpoint = useMediaQuery('(min-width: 600px)');
  const isLgBreakpoint = useMediaQuery('(min-width: 1200px)');
  // local variables
  // functions

  function handlePageChange(event, value) {
    setPage(value);
  }
  // return
  if (totalPages === 0) return null;
  // primary return
  return (
    <>
      <Stack spacing={2}>
        <Pagination
          size={isLgBreakpoint ? 'large' : isSmBreakpoint ? '' : 'small'}
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          siblingCount={isSmBreakpoint ? 1 : 0}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBack, next: ArrowForward }}
              {...item}
            />
          )}
        />
      </Stack>
    </>
  );
}
