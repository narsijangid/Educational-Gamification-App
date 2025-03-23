import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import { useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [user, setUser] = useState({
    id: 1,
    name: 'John Doe',
    points: 0,
    badges: [],
    level: 1,
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app">
          <Navbar user={user} />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/quiz/:id" element={<Quiz user={user} setUser={setUser} />} />
              <Route path="/leaderboard" element={<Leaderboard user={user} />} />
              <Route path="/profile" element={<Profile user={user} />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
