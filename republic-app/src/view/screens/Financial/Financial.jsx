import React from 'react'
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import './Financial.css';

export function Financial() {
  return (
    <div className='Financial-body'>
      <Header pageTitle={"Administrativo financeiro"}/>
      <div>
        <h1>Financial</h1>
        <Button
            buttonTitle={"Adicionar novo gasto"}
            // Passar função para adicionar novo gasto
            onClickHandler={() => { }}
        />
      </div>
    </div>
  )
}
