import { Container, Grid, Typography, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';
import StarIcon from '@mui/icons-material/Star';

const mockQuizzes = [
  {
    id: 1,
    title: 'Mathematics Basics',
    subject: 'Math',
    difficulty: 'Easy',
    timeLimit: 10,
    points: 100,
    recommended: true,
  },
  {
    id: 2,
    title: 'World History',
    subject: 'History',
    difficulty: 'Medium',
    timeLimit: 15,
    points: 150,
    recommended: false,
  },
  {
    id: 3,
    title: 'Science Quiz',
    subject: 'Science',
    difficulty: 'Hard',
    timeLimit: 20,
    points: 200,
    recommended: true,
  },
];

const Home = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome back, {user.name}!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Continue your learning journey with these recommended quizzes
        </Typography>
      </motion.div>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {mockQuizzes.map((quiz, index) => (
          <Grid item xs={12} sm={6} md={4} key={quiz.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s',
                  },
                }}
              >
                {quiz.recommended && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      color: 'primary.main',
                    }}
                  >
                    <StarIcon />
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {quiz.title}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Subject: {quiz.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Difficulty: {quiz.difficulty}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TimerIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {quiz.timeLimit} minutes
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    {quiz.points} points
                  </Typography>
                </CardContent>
                <CardActions sx={{ mt: 'auto' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                  >
                    Start Quiz
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 