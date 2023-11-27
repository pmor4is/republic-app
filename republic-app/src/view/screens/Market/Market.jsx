import React, { useEffect, useState } from 'react';
import './Market.css';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';


export function Market() {
  const navigate = useNavigate();


  // Controladores da API
  const [market, setMarket] = useState([]);
  const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  // Controlador da opção de cadastrar ou adicionar
  const [operation, setOperation] = useState("");

  // Conexão com o backend criado na pasta node-server
  // URL cadastrada na Vercel
  const url = "https://republic-app.vercel.app/market/";

  useEffect(() => {
    axios.get(url)
      .then((response) => setMarket(response.data))
      .catch((error) => console.log(error))
  }, [url]);
  

  // Função para navegar para outra página ao clicar no botão
  const navigateToAddProduct = () => {
    // O caminho "/adicionar-produto" é um exemplo. Substitua pelo caminho desejado.
    navigate("/marketform");
  };


  return (
    <div className='Market-content'>
      <div className='Market-toShopping'>
        <h1>Lista de compras</h1>

      </div>
      <div className='Market-inventory'> 
      <h1>Inventário</h1>
      {/* Botão para criar novos produtos ou voltar, com renderização condicional dos inputs*/}
      {/* Adicionar novo produto */}
      
          <div>
          <button onClick={navigateToAddProduct}>Adicionar novo produto</button>
          {market ? market.map((item) => {
            return (
              <div className='ProductCard' key={item.id}>
                <h1> {item.productname}</h1>
                <h2>Descrição: {item.productdescription}</h2>
                <h3>Quantidade: {item.productquantity}</h3>
                <div className='ProductCardButton'>
                  <button>
                    <EditIcon />
                    Editar
                  </button>
                  <button>
                    <EditIcon />
                    Delete
                  </button>
                </div>
              </div>
            );
          }) : false}
        </div>
      </div>
    </div>
  )
}
