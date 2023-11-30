import React from 'react'
import { Header } from '../../components/Header/Header';

export function Tasks() {
  return (
    <div>
      <Header />
      <div>
        <h1>Tasks</h1>
        <button>Adicionar nova tarefa</button>
      </div>
    </div>
  )
}