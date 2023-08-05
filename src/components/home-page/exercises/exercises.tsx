import React, { useEffect, useState } from 'react'

import { Box, Stack, Typography, Pagination } from '@mui/material';
import { IExerciseData } from '../../../shared/modals/exercise';
import { ExerciseService } from '../../../shared/services/exercisesService';
import ExerciseCard from '../../exercise-card/exercise_card';
import Loader from '../../loader/loader';

const Exercises = ({ exercises, setExercises, bodyPart }:
  {
    exercises: IExerciseData[],
    setExercises: React.Dispatch<React.SetStateAction<IExerciseData[]>>,
    bodyPart: string
  }) => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [exercisesPerPage] = useState<number>(6);

  const fetchExercisesData = async () => {
    setExercises([])
    let exercisesData: IExerciseData[] = [];
    let response: any;
    if (bodyPart === 'all') {
      response = await ExerciseService.getAllExercises();
    } else {
      response = await ExerciseService.getExerciseByBodyPart(bodyPart);
    }
    exercisesData = response.data as IExerciseData[]

    setExercises(exercisesData);
  };

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event: any, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };


  useEffect(() => {
    fetchExercisesData();
  }, [bodyPart]);

  if (!currentExercises.length) return <Loader />;

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">Showing Results</Typography>
      <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
}

export default Exercises