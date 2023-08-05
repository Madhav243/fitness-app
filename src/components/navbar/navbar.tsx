import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import { ROUTES_CONSTANT } from '../../shared/constants/routes';
import Logo from '../../assets/images/Logo.png';
import './navbar.css';

const Navbar = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      sx={{ gap: { sm: '123px', xs: '40px' }, mt: { sm: '32px', xs: '20px' }, justifyContent: 'none' }}
      px="20px">
      <Link to={ROUTES_CONSTANT.HOME}>
        <img src={Logo} alt='logo' className='logo' />
      </Link>
      <Stack
        direction="row"
        gap="40px"
        fontFamily="Alegreya"
        fontSize="24px"
        alignItems="flex-end">
        <Link to={ROUTES_CONSTANT.HOME} className='home-tag'>
          Home
        </Link>
        <a href='#exercises' className='exercise-tag'>Exercises</a>

      </Stack>
    </Stack>

  )
}

export default Navbar