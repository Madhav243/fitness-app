import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { ROUTES_CONSTANT } from './shared/constants/routes';
import HomePage from './components/home-page/home_page';
import ExercisePage from './components/exercise-page/exercise_page';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';

function App() {
  const [appName,setAppName] = useState(process.env.REACT_APP_APP_NAME);

  useEffect(()=>{
    document.title = appName ? appName.toString() : ''
  },[appName])
  return (
    <Box width="400px" sx={{ width: { 'xl': '1488px' } }} m='auto'>
      <Navbar />
      <Routes>
        <Route path={ROUTES_CONSTANT.HOME} element={<HomePage />}></Route>
        <Route path={ROUTES_CONSTANT.EXERCISE + '/:id'} element={<ExercisePage />}></Route>
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
