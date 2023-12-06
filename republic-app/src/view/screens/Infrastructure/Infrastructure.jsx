import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Infrastructure.css';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import { Searchbar } from '../../components/SearchBar/Searchbar';
import { InfrastructureCard } from '../../components/InfrastructureCard/InfrastructureCard';
import CircularProgress from '@mui/material/CircularProgress';

export function Infrastructure() {
  const [infrastructure, setInfrastructure] = useState([]);
  const [id, setId] = useState("");
  const [repairName, setRepairName] = useState("");
  const [repairDescription, setRepairDescription] = useState("");
  const [repairLocal, setRepairLocal] = useState("");
  const [repairPriority, setRepairPriority] = useState("");
  const [repairObservations, setRepairObservations] = useState("");
  const [repairLimitDate, setRepairLimitDate] = useState("");
  const [query, setQuery] = useState("");
  const [filteredInfrastructure, setFilteredInfrastructure] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  const url = "https://republic-app.vercel.app/infrastructure/";

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setInfrastructure(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error))
  }, [url]);

  function deleteData(idToDelete) {
    axios.delete(url + idToDelete)
      .then(() => setInfrastructure(infrastructure.filter((item) => item.id !== idToDelete)))
      .catch((error) => console.log(error));
  }

  function handleSearch(query) {
    const filteredResults = infrastructure.filter((item) => {
      return (
        item.repairname.toLowerCase().includes(query.toLowerCase()) ||
        item.repairdescription.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredInfrastructure(filteredResults);
  }

  function navigateToInfrastructureForm(id, repairName, repairDescription, repairLocal, repairPriority, repairObservations, repairLimitDate) {
    navigate("/infrastructureform", {
      state: {
        id: id,
        repairName: repairName,
        repairDescription: repairDescription,
        repairLocal: repairLocal,
        repairPriority: repairPriority,
        repairObservations: repairObservations,
        repairLimitDate: repairLimitDate,
      }
    });
  };

  return (
    <div className='Infrastructure-body'>
      <Header pageTitle={"Infraestrutura"} />

      <div className='Inputs'>
        <div className='SearchInput'>
          <Searchbar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch} />
        </div>
        <div className='ProductInput'>
          <Button
            buttonTitle={"Adicionar novo conserto"}
            // Passar função para imprimir relatório
            onClickHandler={() => navigateToInfrastructureForm(0, "", "", "", "", "", "")}
          />
        </div>
      </div>

      {isLoading ?
        <CircularProgress className="circularProgress" color="inherit" /> : (
          <div className='Infrastructure-content'>
            {/* Coluna da esquerda */}
            <div className='column priority-1'>
              <h1>Baixa prioridade</h1>

              {filteredInfrastructure.length > 0 ? (
                filteredInfrastructure.filter((item) => item.repairpriority === 1).map((item) => {
                  return (
                    <InfrastructureCard
                      key={item.id}
                      item={item}
                      onDelete={() => deleteData(item.id)}
                      onEdit={() => navigateToInfrastructureForm(
                        item.id,
                        item.repairname,
                        item.repairdescription,
                        item.repairlocal,
                        item.repairpriority,
                        item.repairobservations,
                        item.repairlimitdate,
                      )}
                    />
                  );
                })
              ) : (
                infrastructure
                  .filter((item) => item.repairpriority === 1)
                  .map((item) => {
                    return (
                      <InfrastructureCard
                        key={item.id}
                        item={item}
                        onDelete={() => deleteData(item.id)}
                      // onEdit={() => navigateToForm(item.id, item.productname, item.productdescription, item.productquantity)}
                      />
                    );
                  })
              )}
            </div>

            {/* Coluna do meio */}
            <div className='column priority-2'>
              <h1>Média prioridade</h1>

              {filteredInfrastructure.length > 0 ? (
                filteredInfrastructure.filter((item) => item.repairpriority === 2).map((item) => {
                  return (
                    <InfrastructureCard
                      key={item.id}
                      item={item}
                      onDelete={() => deleteData(item.id)}
                    // onEdit={() => navigateToForm(item.id, item.repairname, item.productdescription, item.productquantity)}
                    />
                  );
                })
              ) : (
                infrastructure
                  .filter((item) => item.repairpriority === 2)
                  .map((item) => {
                    return (
                      <InfrastructureCard
                        key={item.id}
                        item={item}
                        onDelete={() => deleteData(item.id)}
                      // onEdit={() => navigateToForm(item.id, item.productname, item.productdescription, item.productquantity)}
                      />
                    );
                  })
              )}
            </div>

            {/* Coluna da direita */}
            <div className='column priority-3'>
              <h1>Alta prioridade</h1>

              {filteredInfrastructure.length > 0 ? (
                filteredInfrastructure.filter((item) => item.repairpriority === 3).map((item) => {
                  return (
                    <InfrastructureCard
                      key={item.id}
                      item={item}
                      onDelete={() => deleteData(item.id)}
                    // onEdit={() => navigateToForm(item.id, item.repairname, item.productdescription, item.productquantity)}
                    />
                  );
                })
              ) : (
                infrastructure
                  .filter((item) => item.repairpriority === 3)
                  .map((item) => {
                    return (
                      <InfrastructureCard
                        key={item.id}
                        item={item}
                        onDelete={() => deleteData(item.id)}
                      // onEdit={() => navigateToForm(item.id, item.productname, item.productdescription, item.productquantity)}
                      />
                    );
                  })
              )}
            </div>
          </div>
        )
      }
    </div>
  );
}
