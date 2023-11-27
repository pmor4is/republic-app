import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MarketForm.css';

import axios from 'axios';

export function MarketForm() {
    // Controladores da API
    const [market, setMarket] = useState([]);
    const [id, setId] = useState("");
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const navigate = useNavigate();

    // Conexão com o backend criado na pasta node-server
    // URL cadastrada na Vercel
    const url = "https://republic-app.vercel.app/market/";

    function cleanData() {
        setId("");
        setProductName("");
        setProductDescription("");
        setProductQuantity("");
    }

    function saveData(event) {
        event.preventDefault();
        if (productName !== "" && productDescription !== "" && productQuantity !== "") {
            axios.post(url, {
                productName: productName,
                productDescription: productDescription,
                productQuantity: (productQuantity ? productQuantity : null),
            })
                .then((response) => {
                    console.log(response);
                    navigateToMarket();
                })
                .catch((error) => console.log(error));
        } else {
            console.log("Preencha os campos")
        }
    }

    const navigateToMarket = () => {
        // O caminho "/adicionar-produto" é um exemplo. Substitua pelo caminho desejado.
        navigate("/market");
      };

    return (
        <div>
            <div className='MarketForm-body'>
                <form className='MarketForm'>
                    <input
                        type='text'
                        value={productName}
                        onChange={(e) => { setProductName(e.target.value) }}
                    />
                    <input
                        type='text'
                        value={productDescription}
                        onChange={(e) => { setProductDescription(e.target.value) }}
                    />
                    <input
                        type='number'
                        value={productQuantity}
                        onChange={(e) => { setProductQuantity(e.target.value) }}
                    />
                    <button type='button' onClick={saveData}>Gravar</button>
                    <button type='button' onClick={cleanData}>Limpar dados</button>
                </form>
            </div>
        </div>
    )
}
