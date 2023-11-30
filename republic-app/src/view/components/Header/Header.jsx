import { useNavigate, useLocation, Link } from 'react-router-dom';
import React from 'react';
import './Header.css';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function Header() {

  const location = useLocation();
  const navigate = useNavigate();

  // Função para verificar se está na HomePage
  const isHomePage = location.pathname === '/';

  return (
    <div className='HeaderBody'>
      {!isHomePage && (
        <Button onClick={() => navigate(-1)}> {/* Usar navigate(-1) é uma maneira mais segura de navegar para trás */}
          <ArrowBackIcon />
        </Button>
      )}
        <h1>Header</h1>
    </div>
  )
}