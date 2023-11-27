import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Infrastructure.css';

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

  function getPriorityLabel(repairPriority) {
    if (repairPriority === 1) {
      return "leve";
    } else if (repairPriority === 2) {
      return "media";
    } else if (repairPriority === 3) {
      return "alta";
    }
    return "";
  }

  return (
    <div>
        {infrastructure ? infrastructure.map((item) => {
            return (
              <div key={item.id}>
                {item.id}
                <h1> {item.repairname}</h1>
                <h2>Descrição: {item.repairdescription}</h2>
                <h3>Local: {item.repairlocal}</h3>
                <h4>Prioridade: {getPriorityLabel(item.repairpriority)}</h4>
                <h4>Observações: {item.repairobservations}</h4>
                <h4>Data limite: {item.repairlimitdate}</h4>
              </div>
            );
          }) : false}
    </div>
  );
}
