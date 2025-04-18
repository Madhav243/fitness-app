import React, { useEffect, useState } from 'react';
import './exercise_page.css' ;
import { useParams } from 'react-router-dom';
import { IExerciseData } from '../../shared/modals/exercise';
import { ExerciseService } from '../../shared/services/exercisesService';
import { YoutubeService } from '../../shared/services/youtubeService';
import { IYoutubeSearch, IYoutubeVideo } from '../../shared/modals/youtube';
import { Box } from '@mui/material';
import Detail from './exercise-detail/exercise_detail';
import ExerciseVideos from './exercise-video/exercise_video';
import SimilarExercises from './similar-exercises/similar_exercises';

const ExercisePage = () => {
  const [exerciseDetail, setExerciseDetail] = useState<IExerciseData>({} as IExerciseData);
  const [exerciseVideos, setExerciseVideos] = useState<IYoutubeVideo[]>([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState<IExerciseData[]>([]);
  const [equipmentExercises, setEquipmentExercises] = useState<IExerciseData[]>([]);
  const { id } = useParams();

  const fetchExercisesData = async ()=>{
    const exerciseResponse = await ExerciseService.getExerciseById(id ?? '');
    const exerciseDetailData = {...exerciseResponse.data} as IExerciseData
    setExerciseDetail(exerciseDetailData);

    const targetMuscleExercisesResponse = await ExerciseService.getExercisesByTargetMuscle(exerciseDetailData.target)
    const targetMuscleExercisesData = [...targetMuscleExercisesResponse.data] as IExerciseData[]
    setTargetMuscleExercises(targetMuscleExercisesData);

    const equimentExercisesResponse = await ExerciseService.getExercisesByEquipment(exerciseDetailData.equipment);
    const equimentExercisesData = [...equimentExercisesResponse.data] as IExerciseData[]
    setEquipmentExercises(equimentExercisesData);

    const youtubeResponse = await YoutubeService.searchExerciseOnYoutube(exerciseDetailData.name);
    const youtubeData = {...youtubeResponse.data} as IYoutubeSearch
    setExerciseVideos(youtubeData.contents);

    

  }

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchExercisesData();
  },[id])
  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
}

export default ExercisePage