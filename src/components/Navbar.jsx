import { AppBar, Toolbar, Typography, Button, Box, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = ({ user }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          EduGamify
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                color: '#ffffff',
              },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/leaderboard"
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                color: '#ffffff',
              },
            }}
          >
            <LeaderboardIcon sx={{ mr: 1 }} />
            Leaderboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/profile"
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                color: '#ffffff',
              },
            }}
          >
            <PersonIcon sx={{ mr: 1 }} />
            Profile
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Badge badgeContent={user.points} color="secondary">
              <EmojiEventsIcon />
            </Badge>
            <Typography variant="body2">
              Level {user.level}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 