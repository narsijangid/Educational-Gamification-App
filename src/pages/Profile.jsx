import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Chip,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import SchoolIcon from '@mui/icons-material/School';
import TimelineIcon from '@mui/icons-material/Timeline';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockProgressData = [
  { name: 'Week 1', points: 400 },
  { name: 'Week 2', points: 600 },
  { name: 'Week 3', points: 800 },
  { name: 'Week 4', points: 1000 },
];

const mockSubjectData = [
  { name: 'Mathematics', value: 35 },
  { name: 'Science', value: 25 },
  { name: 'History', value: 20 },
  { name: 'English', value: 20 },
];

const mockAchievements = [
  { id: 1, name: 'First Quiz Master', description: 'Complete your first quiz', icon: <StarIcon />, unlocked: true },
  { id: 2, name: 'Speed Demon', description: 'Complete a quiz in under 2 minutes', icon: <TimelineIcon />, unlocked: false },
  { id: 3, name: 'Perfect Score', description: 'Get 100% on any quiz', icon: <EmojiEventsIcon />, unlocked: true },
  { id: 4, name: 'Scholar', description: 'Reach level 5', icon: <SchoolIcon />, unlocked: false },
  { id: 5, name: 'Streak Master', description: 'Complete quizzes for 7 days straight', icon: <TimelineIcon />, unlocked: false },
  { id: 6, name: 'Subject Expert', description: 'Master any subject with 90% accuracy', icon: <SchoolIcon />, unlocked: false },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Profile = ({ user }) => {
  const [tabValue, setTabValue] = useState(0);
  const nextLevelPoints = 1000;
  const progress = (user.points % nextLevelPoints) / nextLevelPoints * 100;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getLevelTitle = (level) => {
    const titles = [
      'Novice Learner',
      'Knowledge Seeker',
      'Academic Explorer',
      'Subject Master',
      'Learning Champion',
      'Educational Expert',
    ];
    return titles[Math.min(level - 1, titles.length - 1)] || 'Educational Expert';
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
            Profile
          </Typography>
          <Box>
            <Tooltip title="Edit Profile">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto 16px',
                  bgcolor: 'primary.main',
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user.name}
              </Typography>
              <Chip
                label={getLevelTitle(user.level)}
                color="primary"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <EmojiEventsIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5">{user.points} points</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Level {user.level}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ height: 10, borderRadius: 5, mb: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                {nextLevelPoints - (user.points % nextLevelPoints)} points to next level
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Progress" />
              <Tab label="Achievements" />
              <Tab label="Statistics" />
            </Tabs>
          </Paper>

          {tabValue === 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Learning Progress
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Line
                        type="monotone"
                        dataKey="points"
                        stroke="#2196f3"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          )}

          {tabValue === 1 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Achievements
                </Typography>
                <Grid container spacing={2}>
                  {mockAchievements.map((achievement) => (
                    <Grid item xs={12} sm={6} key={achievement.id}>
                      <Card
                        sx={{
                          opacity: achievement.unlocked ? 1 : 0.5,
                          bgcolor: achievement.unlocked ? 'background.paper' : 'action.hover',
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemIcon>{achievement.icon}</ListItemIcon>
                            <Box>
                              <Typography variant="subtitle1">
                                {achievement.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {achievement.description}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}

          {tabValue === 2 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Subject Distribution
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockSubjectData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {mockSubjectData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 