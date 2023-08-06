import React, { useEffect, useState } from 'react';
import { Stack, Box, Button, TextField, Typography } from '@mui/material';
import './search_exercises.css';
import { IExerciseData } from '../../../shared/modals/exercise';
import { ExerciseService } from '../../../shared/services/exercisesService';
import HorizontalScrollbar from '../horizontal-scrollbar/horizontal_scrollbar';


const SearchExercises = ({setExercises , bodyPart , setBodyPart}:{
    setExercises:React.Dispatch<React.SetStateAction<IExerciseData[]>>,
    bodyPart:string,
    setBodyPart : React.Dispatch<React.SetStateAction<string>>
}) => {
    const [search, setSearch] = useState<string>('');
    const [bodyPartsList , setBodyPartList] = useState<Array<string>>([]);
    
    const getBodyParts = async ()=>{
        const response = await ExerciseService.getAllBodyParts();
        return response.data as Array<string>
    }
    const fetchBodyParts = async ()=> {
        const bodyParts = await getBodyParts();
        setBodyPartList(['all',...bodyParts]);
    }

    useEffect(()=>{
        fetchBodyParts()
    },[])


    const handleSearch = async ()=>{
        if(search) {
            const exercisesResponse = await ExerciseService.getAllExercises();
            const exercisesData = exercisesResponse.data as IExerciseData[];
            const searchedExercises = exercisesData.filter(
                (item) => item.name.toLowerCase().includes(search)
                       || item.target.toLowerCase().includes(search)
                       || item.equipment.toLowerCase().includes(search)
                       || item.bodyPart.toLowerCase().includes(search),
              );    
              setExercises(searchedExercises);
              setSearch('');
        }
    }

    return (
        <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
            <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
                Awesome Exercises You <br /> Should Know
            </Typography>
            <Box position="relative" mb="72px">
                <TextField
                    sx={{
                        input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
                        width: { lg: '1170px', xs: '350px' },
                        backgroundColor: '#fff',
                        borderRadius: '40px',
                    }}
                    placeholder="Search Exercises"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value?.toLowerCase())}
                />
                <Button className="search-btn" sx={{
                    bgcolor: '#FF2625',
                    color: '#fff',
                    textTransform: 'none',
                    width: { lg: '173px', xs: '80px' },
                    height: '56px',
                    position: 'absolute',
                    right: '0px',
                    fontSize: { lg: '20px', xs: '14px' }
                }}
                onClick={handleSearch}
                >
                    Search
                </Button>
            </Box>
            <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
                <HorizontalScrollbar data={bodyPartsList} bodyParts={bodyPartsList} setBodyPart={setBodyPart} bodyPart={bodyPart}  />
            </Box>
        </Stack>
    )
}

export default SearchExercises
