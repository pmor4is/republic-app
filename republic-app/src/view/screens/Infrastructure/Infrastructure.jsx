import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Infrastructure.css';
import { Header } from '../../components/Header/Header';

export function Infrastructure() {
  const [infrastructure, setInfrastructure] = useState([]);
  const [id, setId] = useState("");
  const [repairName, setRepairName] = useState("");
  const [repairDescription, setRepairDescription] = useState("");
  const [repairLocal, setRepairLocal] = useState("");
  const [repairPriority, setRepairPriority] = useState("");
  const [repairObservations, setRepairObservations] = useState("");
  const [repairLimitDate, setRepairLimitDate] = useState("");

  const url = "https://republic-app.vercel.app/infrastructure/";

  useEffect(() => {
    fetch(url)
      .then((fetchResponse) => fetchResponse.json())
      .then((jsonResponse) => setInfrastructure(jsonResponse))
      .catch((error) => console.log(error))
  }, [url]);

  // Função para associar a cada int, sua prioridade específica.
  function getPriorityLabel(repairPriority) {
    if (repairPriority === 1) {
      return "Leve";
    } else if (repairPriority === 2) {
      return "Média";
    } else if (repairPriority === 3) {
      return "Alta";
    }
    return "";
  }

  // Função para formatar a data no padrão brasileiro sem horário
  function formatDate(dataString) {
    // Verifica se for cadastrada data, para poder formatar
    if (dataString) {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR');
    }
    // Se não existir data definida, retorna essa mensagem
    return "Sem data definida"; 
  }

  return (
    <div className='Infrastructure-body'>
      <Header />
      <div className='Infrastructure-content'>
        {/* Coluna da esquerda */}
        <div className='column priority-1'>
          <h1>Baixa prioridade</h1>
          {infrastructure
            .filter(item => item.repairpriority === 1)
            .map(item => (
              <div key={item.id} className='item-container'>
                 <h1> {item.repairname}</h1>
              <h2>Descrição: {item.repairdescription}</h2>
              <h3>Local: {item.repairlocal}</h3>
              <h4>Prioridade: {getPriorityLabel(item.repairpriority)}</h4>
              <h4>Observações: {item.repairobservations}</h4>
              <h4>Data limite: {formatDate(item.repairlimitdate)}</h4>
              </div>
            ))}
        </div>
  
        {/* Coluna do meio */}
        <div className='column priority-2'>
          <h1>Média prioridade</h1>
          {infrastructure
            .filter(item => item.repairpriority === 2)
            .map(item => (
              <div key={item.id} className='item-container'>
                <h1> {item.repairname}</h1>
              <h2>Descrição: {item.repairdescription}</h2>
              <h3>Local: {item.repairlocal}</h3>
              <h4>Prioridade: {getPriorityLabel(item.repairpriority)}</h4>
              <h4>Observações: {item.repairobservations}</h4>
              <h4>Data limite: {formatDate(item.repairlimitdate)}</h4>
              </div>
            ))}
        </div>
  
        {/* Coluna da direita */}
        <div className='column priority-3'>
          <h1>Alta prioridade</h1>
          {infrastructure
            .filter(item => item.repairpriority === 3)
            .map(item => (
              <div key={item.id} className='item-container'>
                <h1> {item.repairname}</h1>
              <h2>Descrição: {item.repairdescription}</h2>
              <h3>Local: {item.repairlocal}</h3>
              <h4>Prioridade: {getPriorityLabel(item.repairpriority)}</h4>
              <h4>Observações: {item.repairobservations}</h4>
              <h4>Data limite: {formatDate(item.repairlimitdate)}</h4>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className='Infrastructure-body'>
  //     <Header />
  //     <div className='Infrastructure-content'>
  //       {infrastructure ? infrastructure.map((item) => {
  //         return (
  //           <div key={item.id}  className={`item-container priority-${item.repairpriority}`}>
              // <h1> {item.repairname}</h1>
              // <h2>Descrição: {item.repairdescription}</h2>
              // <h3>Local: {item.repairlocal}</h3>
              // <h4>Prioridade: {getPriorityLabel(item.repairpriority)}</h4>
              // <h4>Observações: {item.repairobservations}</h4>
              // <h4>Data limite: {formatDate(item.repairlimitdate)}</h4>
  //           </div>
  //         );
  //       }) : false}
  //     </div>
  //   </div>
  // );
}
