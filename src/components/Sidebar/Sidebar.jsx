// mui
import {
  Divider,
  Box,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
// useTheme (mui)
import { useTheme } from '@mui/material/styles';
// router
import { Link } from 'react-router-dom';
// icons
import icons from '../../assets/icons';

export default function Sidebar() {
  // hooks
  const theme = useTheme();
  // local variables
  // functions

  // return
  return (
    <>
      <Box
        sx={{
          bgcolor: `${theme.palette.greyLight.main}`,
          position: 'fixed',
          overflowY: 'auto',
          height: '100%',
          width: { xs: '100%', md: '33.333%', lg: '25%', xl: '16.666%' },
        }}
      >
        <List>
          <ListSubheader sx={{ bgcolor: `${theme.palette.greyLight.main}` }}>
            Categories
          </ListSubheader>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Popular'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Top Rated'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Upcoming'
              />
            </ListItemButton>
          </Link>
        </List>

        <Divider />

        <List>
          <ListSubheader sx={{ bgcolor: `${theme.palette.greyLight.main}` }}>
            Genres
          </ListSubheader>

          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Action'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Adventure'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Animation'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Comedy'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Crime'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Documentary'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Drama'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Family'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Fantasy'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='History'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Horror'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Music'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Mystery'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Romance'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Science Fiction'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='TV Movie'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='War'
              />
            </ListItemButton>
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: `${theme.palette.dark.main}`,
            }}
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon sx={{ height: '32px' }}>
                <img src={icons.icon} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 20,
                }}
                primary='Western'
              />
            </ListItemButton>
          </Link>
        </List>
      </Box>
    </>
  );
}
