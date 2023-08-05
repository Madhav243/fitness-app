import React , { useState} from 'react';
import './home_page.css';
import HeroBanner from './hero-banner/hero_banner';
import SearchExercises from './search-exercises/search_exercises';
import Exercises from './exercises/exercises';
import { Box } from '@mui/material';
import { IExerciseData } from '../../shared/modals/exercise';

const HomePage = () => {
  const [exercises, setExercises] = useState<IExerciseData[]>([]);
  const [bodyPart,setBodyPart] = useState<string>('all');
  
  return (
    <Box >
      <HeroBanner />
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart}  />
      <Exercises setExercises={setExercises} bodyPart={bodyPart} exercises={exercises} />
    </Box>
  )
}

export default HomePage