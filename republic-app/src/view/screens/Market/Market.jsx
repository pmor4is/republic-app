import React, { useEffect, useState } from 'react';
import { MarketForm } from '../../../components/MarketForm/MarketForm';
import './Market.css';
import axios from 'axios';

export function Market() {
  // Controladores da API
  const [market, setMarket] = useState([]);
  const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setQuantity] = useState("");

  // Controlador da opção de cadastrar ou adicionar
  const [operation, setOperation] = useState("");

  // Conexão com o backend criado na pasta node-server
  // URL cadastrada na Vercel
  const url = "";

  useEffect(() =>{
    fetch(url)
      .then((fetchResponse) => fetchResponse.json())
      .then((jsonResponse) => setMarket(jsonResponse))
      .catch((error) => console.log(error))
  }, [url]);


  function cleanData() {
    setId("");
    setProductName("");
    setQuantity("");
    setProductDescription("");
  }

  function newData() {
    setOperation("createRegister");
  }

  function editMarket(idToEdit) {
    let market = market.find((item) => item.id === idToEdit);
    const { id, productName, productDescription, productQuantity } = market;
  }

  // Constante para adicionar novos produtos ao clicar no botão
  const [showInput, setShowInput] = useState(false);
  //Alterna o estado do botão de adicionar novos produtos
  const toggleInput = () => {
    setShowInput(!showInput);
  };


  return (
    <div className='Market-content'>
      <h1>Lista de compras</h1>

      {/* Botão para criar novos produtos ou voltar, com renderização condicional dos inputs*/}
      <button onClick={toggleInput}>{showInput ? 'Voltar' : 'Editar lista de compras'}</button>
      {/* Adicionar novo produto */}
      {showInput ? (
        <div className='MarketForm-body'>
          <form className='MarketForm'>
            <input
              type='text'
              value={productName}
            />
            <input
              type='text'
              value={productDescription}
            />
            <input
              type='number'
              value={productQuantity}
            />
            <button type='button'>Gravar</button>
            <button type='button' onClick={cleanData}>Limpar dados</button>
          </form>
        </div>
      ) : (
        <h1>Lista de produtos</h1>
      )}
      <div>
      </div>
    </div>
  )
}
