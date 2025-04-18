import { AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from "axios";
import http from "../../utils/exercises-http";
import { IExerciseData } from "../modals/exercise";
import { bodyPartList, exercises } from "../constants/exercises";

let allExercises : IExerciseData[] = exercises

let allBodyParts : Array<string> = bodyPartList;


const getAxiosResponseObj = (data : any) : AxiosResponse => {
  const obj : AxiosResponse = {
    data ,
    status: 200,
    statusText: 'Success',
    headers: {} as AxiosResponseHeaders,
    config: {} as InternalAxiosRequestConfig<any> ,
  } 
  return obj
}

const getAllExercises = async () => {
  if(Array.isArray(allExercises) && allExercises.length) {
     return getAxiosResponseObj(allExercises)
  } else {
    const response = await http.get<IExerciseData[]>("/exercises?limit=1500");
    allExercises = response.data as IExerciseData[];
    return getAxiosResponseObj(allExercises)
  }

};

const getExerciseById = async (id: string) => {
    const foundExercise = allExercises && allExercises.find(exercise => exercise.id === id);
    if(foundExercise) return getAxiosResponseObj(foundExercise)
    else {
      const res = await http.get<IExerciseData>(`/exercises/exercise/${id}`);
      const newExercise = res.data as IExerciseData;
      allExercises.push(newExercise);
      return getAxiosResponseObj(newExercise)
    }
};

const getAllBodyParts = async () => {
  if(Array.isArray(allBodyParts) && allBodyParts.length) {
    return getAxiosResponseObj(allBodyParts);
  } else {
    const res = await http.get<Array<string>>(`/exercises/bodyPartList`); 
    return getAxiosResponseObj(res.data)
  }

}

const getExerciseByBodyPart = async (bodyPart:string) =>{
  const foundExercises = allExercises && allExercises.filter(exercise => exercise.bodyPart === bodyPart);
  if(foundExercises) return getAxiosResponseObj(foundExercises)
  else {
    const res = await http.get<IExerciseData[]>(`/exercises/bodyPart/${bodyPart}`);
    return getAxiosResponseObj(res.data);
  }
}

const getExercisesByTargetMuscle = async (muscleName : string) =>{
  const foundExercises = allExercises && allExercises.filter(exercise => exercise.target === muscleName);
  if(foundExercises) return getAxiosResponseObj(foundExercises)
  else {
    const res = await http.get<IExerciseData[]>(`/exercises/target/${muscleName}`);
    return getAxiosResponseObj(res.data)
  }
}

const getExercisesByEquipment = async (equipmentName : string) =>{
  const foundExercises = allExercises && allExercises.filter(exercise => exercise.equipment === equipmentName);
  if(foundExercises) return getAxiosResponseObj(foundExercises)
  else {
    const res = await http.get<IExerciseData[]>(`/exercises/equipment/${equipmentName}`);
    return getAxiosResponseObj(res.data)
  }
}

export const ExerciseService = {
  getAllExercises,
  getExerciseById,
  getAllBodyParts,
  getExerciseByBodyPart,
  getExercisesByTargetMuscle,
  getExercisesByEquipment
}
