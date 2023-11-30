import React, { useEffect, useState } from 'react';
import './Market.css';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { Searchbar } from '../../components/SearchBar/Searchbar';
import { Header } from '../../components/Header/Header';

export function Market() {
  const [market, setMarket] = useState([]);
  const [id, setId] = useState([]);
  const [productName, setPName] = useState("");
  const [productDescription, setPDescription] = useState("");
  const [productQuantity, setPQuantity] = useState("");
  // const [query, setQuery] = useState("");
  const navigate = useNavigate();
  // const [filteredMarket, setFilteredMarket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // Conexão com o backend criado na pasta node-server
  // URL cadastrada na Vercel
  const url = "https://republic-app.vercel.app/market/";

  // Método GET
  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setMarket(response.data)
        setIsLoading(false);
      })
      .catch((error) => console.log(error))
  }, [url]);

  // Método DELETE
  function deleteData(idToDelete) {
    axios.delete(url + idToDelete)
      .then(() => setMarket(market.filter((item) => item.id !== idToDelete)))
      .catch((error) => console.log(error));
  }

  // Função para navegar para outra página ao clicar no botão
  function navigateToForm(id, productName, productDescription, productQuantity) {
    navigate("/marketform", {
      state: {
        id: id,
        productName: productName,
        productDescription: productDescription,
        productQuantity: productQuantity,
      }
    });
  };

  return (
    <div className='Market-body'>
      <Header />
      <div className='Market-content'>
      <div className='Market-toShopping'>
        <h1>Lista de compras</h1>

      </div>
      <div className='Market-inventory'>
        <h1>Inventário</h1>
        <button onClick={() => navigateToForm(0, "", "", "")}>Adicionar novo produto</button>
        {/* <Searchbar market={market} query={query} setQuery={setQuery}/> */}
        <div>
          {isLoading ?  
              <CircularProgress className='circularProgress' color="inherit" />
           : (
            <div>
              {/* Mapeamento da lista de produtos, transformando em cards */}
              {market ? market.map((item) => {
                return (
                  <div className='ProductCard' key={item.id}>
                    <h1>{item.productname}</h1>
                    <h2>Descrição: {item.productdescription}</h2>
                    <h3>Quantidade: {item.productquantity}</h3>

                    <div className='ProductCardButton'>
                      <button onClick={() => navigateToForm(item.id, item.productname, item.productdescription, item.productquantity)}>
                        <EditIcon />
                        Editar
                      </button>

                      <button onClick={(e) => deleteData(item.id)}>
                        <DeleteIcon />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              }) : false}

            </div>
          )}

        </div>
      </div>
    </div>
    </div>
    
  )
}
