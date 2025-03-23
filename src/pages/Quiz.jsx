import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import TimerIcon from '@mui/icons-material/Timer';

const mockQuestions = [
  {
    id: 1,
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Mercury', 'Mars', 'Earth'],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: 'Who painted the Mona Lisa?',
    options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Rembrandt'],
    correctAnswer: 1,
  },
];

const Quiz = ({ user, setUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === mockQuestions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      handleQuizEnd();
    }
  };

  const handleQuizEnd = () => {
    setShowResult(true);
    const pointsEarned = Math.round((score / mockQuestions.length) * 100);
    setUser((prev) => ({
      ...prev,
      points: prev.points + pointsEarned,
      level: Math.floor((prev.points + pointsEarned) / 1000) + 1,
    }));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (showResult) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                Quiz Complete!
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                Score: {score}/{mockQuestions.length}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Points earned: {Math.round((score / mockQuestions.length) * 100)}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{ mt: 2 }}
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">
          Question {currentQuestion + 1}/{mockQuestions.length}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TimerIcon sx={{ mr: 1 }} />
          <Typography variant="h6">{formatTime(timeLeft)}</Typography>
        </Box>
      </Box>

      <LinearProgress
        variant="determinate"
        value={(currentQuestion / mockQuestions.length) * 100}
        sx={{ mb: 3 }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {mockQuestions[currentQuestion].question}
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={selectedAnswer}
                  onChange={(e) => handleAnswerSelect(Number(e.target.value))}
                >
                  {mockQuestions[currentQuestion].options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={index}
                      control={<Radio />}
                      label={option}
                      sx={{
                        '&.Mui-checked': {
                          color: selectedAnswer === index
                            ? index === mockQuestions[currentQuestion].correctAnswer
                              ? 'success.main'
                              : 'error.main'
                            : 'primary.main',
                        },
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                {currentQuestion === mockQuestions.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Card>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default Quiz; 