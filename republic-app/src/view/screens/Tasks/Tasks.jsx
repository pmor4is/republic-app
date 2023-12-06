import React from 'react'
import { Header } from '../../components/Header/Header';
import './Tasks.css';

export function Tasks() {
  return (
    <div className='Tasks-body'>
      <Header pageTitle={"Tarefas"}/>
      <div>
        <h1>Tasks</h1>
        <button>Adicionar nova tarefa</button>
      </div>
    </div>
  )
}