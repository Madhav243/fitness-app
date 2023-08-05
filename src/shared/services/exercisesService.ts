import http from "../../utils/exercises-http";
import { IExerciseData } from "../modals/exercise";

const getAllExercises = () => {
  return http.get<IExerciseData[]>("/exercises");
};

const getExerciseById = (id: string) => {
  return http.get<IExerciseData>(`/exercises/exercise/${id}`);
};

const getAllBodyParts = () => {
  return http.get<Array<string>>(`/exercises/bodyPartList`);
}

const getExerciseByBodyPart = (bodyPart:string) =>{
  return http.get<IExerciseData[]>(`/exercises/bodyPart/${bodyPart}`)
}

const getExercisesByTargetMuscle = (muscleName : string) =>{
  return http.get<IExerciseData[]>(`/exercises/target/${muscleName}`);
}

const getExercisesByEquipment = (equipmentName : string) =>{
  return http.get<IExerciseData[]>(`/exercises/equipment/${equipmentName}`)
}

export const ExerciseService = {
  getAllExercises,
  getExerciseById,
  getAllBodyParts,
  getExerciseByBodyPart,
  getExercisesByTargetMuscle,
  getExercisesByEquipment
}
