import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import './Header.css';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function Header({pageTitle}) {

  const location = useLocation();
  const navigate = useNavigate();

  // Função para verificar se está na HomePage
  const isHomePage = location.pathname === '/';

  return (
    <div className='HeaderBody'>
      {!isHomePage && (
        // Usar navigate(-1) é uma maneira mais segura de navegar para trás 
        <Button className='Back-Button' onClick={() => navigate(-1)}> 
          <ArrowBackIcon sx={{ color: 'white' }} />
        </Button>
      )}
        <h1 className='PageTitle'>{pageTitle}</h1>
        
    </div>
  )
}