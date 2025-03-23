import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import FilterListIcon from '@mui/icons-material/FilterList';

// Mock data for different timeframes
const mockLeaderboardData = {
  all: [
    { id: 1, name: 'John Doe', points: 2500, level: 3, rank: 1, change: 1, avatar: 'JD' },
    { id: 2, name: 'Jane Smith', points: 2300, level: 3, rank: 2, change: -1, avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', points: 2100, level: 2, rank: 3, change: 2, avatar: 'MJ' },
    { id: 4, name: 'Sarah Williams', points: 1900, level: 2, rank: 4, change: -1, avatar: 'SW' },
    { id: 5, name: 'David Brown', points: 1700, level: 2, rank: 5, change: 0, avatar: 'DB' },
  ],
  weekly: [
    { id: 1, name: 'John Doe', points: 800, level: 3, rank: 1, change: 2, avatar: 'JD' },
    { id: 2, name: 'Jane Smith', points: 750, level: 3, rank: 2, change: -1, avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', points: 700, level: 2, rank: 3, change: 1, avatar: 'MJ' },
    { id: 4, name: 'Sarah Williams', points: 650, level: 2, rank: 4, change: -2, avatar: 'SW' },
    { id: 5, name: 'David Brown', points: 600, level: 2, rank: 5, change: 0, avatar: 'DB' },
  ],
  monthly: [
    { id: 1, name: 'John Doe', points: 2000, level: 3, rank: 1, change: 0, avatar: 'JD' },
    { id: 2, name: 'Jane Smith', points: 1800, level: 3, rank: 2, change: 1, avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', points: 1600, level: 2, rank: 3, change: -1, avatar: 'MJ' },
    { id: 4, name: 'Sarah Williams', points: 1400, level: 2, rank: 4, change: 2, avatar: 'SW' },
    { id: 5, name: 'David Brown', points: 1200, level: 2, rank: 5, change: -2, avatar: 'DB' },
  ],
};

const mockSubjectData = {
  math: [
    { id: 1, name: 'John Doe', points: 900, level: 3, rank: 1, change: 1, avatar: 'JD' },
    { id: 2, name: 'Jane Smith', points: 850, level: 3, rank: 2, change: -1, avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', points: 800, level: 2, rank: 3, change: 0, avatar: 'MJ' },
  ],
  science: [
    { id: 1, name: 'John Doe', points: 850, level: 3, rank: 1, change: 0, avatar: 'JD' },
    { id: 2, name: 'Jane Smith', points: 800, level: 3, rank: 2, change: 1, avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', points: 750, level: 2, rank: 3, change: -1, avatar: 'MJ' },
  ],
};

const Leaderboard = ({ user }) => {
  const [timeframe, setTimeframe] = useState('all');
  const [subject, setSubject] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setLoading(true);
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return 'inherit';
    }
  };

  const getRankChangeIcon = (change) => {
    if (change > 0) return <TrendingUpIcon color="success" />;
    if (change < 0) return <TrendingDownIcon color="error" />;
    return null;
  };

  const getCurrentData = () => {
    if (subject === 'all') {
      return mockLeaderboardData[timeframe];
    }
    return mockSubjectData[subject];
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">
            Leaderboard
          </Typography>
          <IconButton onClick={() => setShowFilters(!showFilters)}>
            <FilterListIcon />
          </IconButton>
        </Box>
      </motion.div>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Global" />
          <Tab label="Friends" />
          <Tab label="Subject" />
        </Tabs>
      </Box>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Timeframe</InputLabel>
                <Select
                  value={timeframe}
                  label="Timeframe"
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  <MenuItem value="all">All Time</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Subject</InputLabel>
                <Select
                  value={subject}
                  label="Subject"
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <MenuItem value="all">All Subjects</MenuItem>
                  <MenuItem value="math">Mathematics</MenuItem>
                  <MenuItem value="science">Science</MenuItem>
                  <MenuItem value="history">History</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>User</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell align="right">Level</TableCell>
              <TableCell align="center">Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              getCurrentData().map((player) => (
                <TableRow
                  key={player.id}
                  sx={{
                    backgroundColor: player.id === user.id ? 'action.hover' : 'inherit',
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {player.rank <= 3 ? (
                        <EmojiEventsIcon
                          sx={{
                            color: getRankColor(player.rank),
                            mr: 1,
                          }}
                        />
                      ) : null}
                      {player.rank}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        {player.avatar}
                      </Avatar>
                      {player.name}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{player.points}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`Level ${player.level}`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {getRankChangeIcon(player.change)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaderboard; 