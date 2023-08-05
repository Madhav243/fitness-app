import http from "../../utils/youtube-http";
import { IYoutubeSearch } from "../modals/youtube";


const searchExerciseOnYoutube = (exerciseName : string) =>{
    return http.get<IYoutubeSearch>(`/search?query=${exerciseName} exercise`)
}

export const YoutubeService = {
    searchExerciseOnYoutube
}